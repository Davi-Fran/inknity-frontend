import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useError } from "../contexts/ErrorContext";

// Modais e Assets
import { CreateCommissionModal } from "../components/CreateCommissionModal";
import { CreatePostModal } from "../components/CreatePostModal";
import standard from "../assets/img/standard.svg";
import userPhotoImg from "../assets/img/userPhoto.png";
import type { Timestamp } from "firebase/firestore";

// --- Tipos ---
export type PostItem = {
  id: string;
  type: "post";
  authorId: string;
  title: string;
  caption?: string;
  imageUrl?: string | null;
  createdAt: Timestamp;
};

export type CommissionItem = {
  id: string;
  type: "commission";
  artistId: string;
  title: string;
  description: string;
  exampleImageUrl?: string | null;
  price: number;
  status: 'open' | 'closed';
  createdAt: Timestamp;
  currency?: string
};

export type ItemUnion = PostItem | CommissionItem;

interface UserProfileData {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  isFollowing?: boolean;
  tags?: string[];
}

const Profile: React.FC = () => {
  const { username: routeUsername, targetUsername } = useParams();

  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const { triggerError } = useError();

  const profileHandle = targetUsername || routeUsername;
  const isOwner = currentUser?.username === profileHandle;

  // 3. Estados de Dados
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [posts, setPosts] = useState<ItemUnion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  // 4. Estados de UI
  const [modal, setModal] = useState<null | "post" | "commission" | "edit" | "zoom" | "comments">(null);
  const [selectedTab, setSelectedTab] = useState<"posts" | "commissions">("posts");

  // Payloads para Modais
  const [zoomPost, setZoomPost] = useState<PostItem | null>(null);

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      if (!profileHandle) return;
      setIsLoading(true);

      try {
        const userRes = await api.get(`/users?username=${profileHandle}`);
        const userData = userRes.data;

        if (!userData) throw new Error("Usuário não encontrado");

        const profileInfo = userData.user;
        setProfileData(profileInfo);
        setIsFollowing(profileInfo.isFollowing || false);

        let rawPosts = userData.posts;
        const mappedPosts: PostItem[] = rawPosts.map((p: any) => ({
          id: p.id,
          type: "post",
          authorId: p.authorId,
          title: p.title || "Post",
          caption: p.caption,
          imageUrl: p.imageUrl || null,
          createdAt: p.createdAt
        }));

        // Mapear COMISSÕES
        const rawCommissions = userData.commissions;
        const mappedCommissions = rawCommissions.map((c: any) => ({
          id: c.id,
          type: "commission",
          artistId: c.artistId,
          title: c.title || "Comissão",
          description: c.description,
          exampleImageUrl: c.exampleImageUrl || null,
          price: Number(c.price),
          status: c.status === 'closed' ? 'closed' : 'open',
          createdAt: c.createdAt
        }));

        setPosts([ ...mappedPosts, ...mappedCommissions]);

      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        triggerError("Não foi possível carregar este perfil.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileAndPosts();
  }, [profileHandle]);

  const handleFollow = async () => {
    if (!profileData) return;
    try {
      await api.post(`/users/${profileData.id}/follow`);
      setIsFollowing(!isFollowing);
    } catch (error) {
      triggerError("Erro ao seguir usuário.");
    }
  };

  const handleInitChat = async () => {
    if (!profileData) return;
    try {
      // Rota: POST /chats/init
      const res = await api.post(`/chats/init?targetUserId=${profileData.id}`);
      // Redireciona para a rota de chat com o ID retornado
      navigate(`/user/${currentUser?.username}/chat/${res.data.chatData.chatId}`);
    } catch (error) {
      triggerError("Erro ao iniciar chat.");
    }
  };

  const handleUpdateBioName = async (e: React.FocusEvent<HTMLElement>, field: 'bio' | 'displayName') => {
    const newValue = e.currentTarget.textContent;
    if (newValue === profileData?.[field]) return; // Sem mudança

    try {
      // Rota: PUT /users/me
      await api.put('/users/me', { [field]: newValue });
      // Atualiza estado local
      setProfileData(prev => prev ? ({ ...prev, [field]: newValue }) : null);
    } catch (error) {
      triggerError("Erro ao atualizar perfil.");
    }
  };

  const handleUpload = async (file: File, type: 'avatar' | 'banner') => {
    try {
      const formData = new FormData();
      formData.append(type, file);

      const res = await api.post(`/users/me/${type}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const newUrl = res.data.url;

      setProfileData(prev => prev ? ({
        ...prev,
        [type === 'avatar' ? 'avatarUrl' : 'bannerUrl']: newUrl
      }) : null);

    } catch (error) {
      console.error(error);
      triggerError(`Erro ao atualizar ${type}.`);
    }
  };

  const handlePublishPost = async (data: { caption: string; tags?: string[]; imageFile?: File | null }) => {
    try {
      const formData = new FormData();
      formData.append("caption", data.caption);
      formData.append("tags", JSON.stringify(data.tags));
      if (data.imageFile) formData.append("image", data.imageFile);

      await api.post("/posts", formData, { headers: { "Content-Type": "multipart/form-data" } });

      window.location.reload();
    } catch (error) {
      triggerError("Erro ao publicar post.");
    }
  };

  const handleSubmitCommission = async (data: { name: string; description?: string; price?: number; imageFile?: File | null }) => {
    try {
      const formData = new FormData();
      formData.append("title", data.name);
      formData.append("description", data.description || "");
      formData.append("price", String(data.price || 0));
      if (data.imageFile) formData.append("image", data.imageFile);

      // Rota: POST /commissions
      await api.post("/commissions", formData, { headers: { "Content-Type": "multipart/form-data" } });

      window.location.reload();
    } catch (error) {
      triggerError("Erro ao criar comissão.");
    }
  };

  const deleteItem = async (id: string, type: 'post' | 'commission') => {
    if (!confirm("Tem certeza?")) return;
    try {
      const endpoint = type === 'post' ? `/posts/${id}` : `/commissions/${id}`;
      await api.delete(endpoint);
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      triggerError("Erro ao deletar.");
    }
  }

  const ContentCardInline: React.FC<{ item: ItemUnion }> = ({ item }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Variáveis auxiliares para comissões
    const isCommissionClosed = item.type === 'commission' && item.status === 'closed';

    // Classes Tailwind para mudar o visual se estiver fechada
    const cardClasses = `p-4 mb-4 rounded-xl shadow-lg relative transition-colors ${isCommissionClosed
      ? 'bg-[#1e172a] opacity-60'
      : 'bg-inknity-background-2'
      }`;

    return (
      <div className={cardClasses}>
        {/* Menu só para o dono */}
        {
          isOwner && (
            <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
              <div className="relative">
                <button onClick={() => setMenuOpen(!menuOpen)} className="px-2 py-1 rounded hover:bg-[#34264a]">⋮</button>
                {
                  menuOpen && (
                    <div className="absolute right-0 top-9 bg-[#2a2040] border border-[#3b2d52] rounded-lg shadow-lg z-50 w-36">
                      <button className="w-full block px-3 py-2 text-left text-red-400 hover:bg-red-900/20"
                        onClick={() => deleteItem(item.id, item.type)}>
                        Apagar
                      </button>
                    </div>
                  )
                }
              </div>
            </div>
          )
        }

        {/* **MARCAÇÃO DE STATUS** */}
        {
          item.type === 'commission' && isCommissionClosed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl z-10">
              <span className="text-xl font-bold text-red-400 border border-red-400 p-2 rounded-lg">FECHADA</span>
            </div>
          )
        }

        <div className="flex items-start">
          {/* Imagem com Zoom */}
          <div
            className={`w-1/3 h-32 mr-4 flex items-center justify-center bg-inknity-banner/50 rounded-lg overflow-hidden ${isCommissionClosed ? 'grayscale' : ''}`}>
            <img src={item.exampleImageUrl || item.imageUrl || standard} alt="Thumb" className="w-full h-full object-cover" />
          </div>

          {/* Texto e Ações */}
          <div className="w-2/3 flex flex-col h-32 justify-between">
            <div>
              <p className="text-white text-base font-medium truncate">{item.title}</p>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">{item.description || item.caption}</p>
              {/* Como CommissionItem tem status e price */}
              {
                item.type === "commission" && (
                  <div className="flex items-center mt-1">
                    <p className="text-inknity-yellow font-bold text-sm">R$ {item.price}</p>
                    <span className={`ml-3 px-2 py-0.5 text-xs rounded-full font-semibold ${item.status === 'open' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                      {item.status === 'open' ? 'Aberta' : 'Fechada'}
                    </span>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) return <div className="text-white text-center p-10">Carregando perfil...</div>;
  if (!profileData) return <div className="text-white text-center p-10">Usuário não encontrado.</div>;

  return (
    <div className="min-h-screen bg-inknity-dark-purple text-white overflow-auto md:w-11/12">
      {/* Header Banner */}
      <header className="relative w-full h-60 bg-[#2a2040] overflow-hidden group">
        <img src={profileData.bannerUrl || standard} alt="Banner" className="w-full h-full object-cover opacity-70" />

        {isOwner && (
          <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 cursor-pointer transition">
            <span className="text-white font-bold">Alterar Banner</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], 'banner')} />
          </label>
        )}

        <Link to={`/user/${currentUser?.username}/feed/foryou`} className="absolute left-5 top-5 z-30 text-white bg-black/20 p-2 rounded-full hover:bg-black/40">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </Link>
      </header>

      <div className="md:w-11/12 mx-auto p-6">
        <section className="w-full flex flex-col md:flex-row mt-6 gap-6">

          {/* Coluna Esquerda (Info) */}
          <div className="md:w-1/3 p-4">
            <div className="relative size-24 group">
              <div className="size-24 rounded-full border-4 border-[#281b3d] bg-cover bg-center" style={{ backgroundImage: `url(${profileData.avatarUrl || userPhotoImg})` }} />
              {isOwner && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer">
                  <small>Alterar</small>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], 'avatar')} />
                </label>
              )}
            </div>

            <div className="mt-2">
              {isOwner ? (
                <p className="text-xl font-bold outline-none border-b border-transparent hover:border-gray-500 focus:border-inknity-purple"
                  contentEditable suppressContentEditableWarning onBlur={(e) => handleUpdateBioName(e, 'displayName')}>
                  {profileData.displayName}
                </p>
              ) : (
                <p className="text-xl font-bold">{profileData.displayName}</p>
              )}
              <p className="text-sm text-gray-400">@{profileData.username}</p>
            </div>

            {/* Botões de Ação */}
            <div className="flex items-center space-x-3 my-4">
              {!isOwner ? (
                <>
                  <button onClick={handleFollow} className={`flex-1 py-2 rounded-lg font-semibold text-sm border transition ${isFollowing ? "bg-inknity-purple border-inknity-purple" : "border-inknity-purple text-inknity-purple hover:bg-inknity-purple/10"}`}>
                    {isFollowing ? "Seguindo" : "Seguir"}
                  </button>
                  <button onClick={handleInitChat} className="flex-1 py-2 rounded-lg bg-gray-700 text-white text-sm hover:bg-gray-600">
                    Mensagem
                  </button>
                </>
              ) : (
                <div className="w-full py-2 rounded-lg border border-gray-600 text-gray-400 text-sm text-center">
                  Edite clicando no texto
                </div>
              )}
            </div>

            {/* Bio Editável */}
            {isOwner ? (
              <p className="text-sm text-gray-300 leading-relaxed outline-none border-l-2 border-transparent hover:border-gray-500 focus:border-inknity-purple pl-2"
                contentEditable suppressContentEditableWarning onBlur={(e) => handleUpdateBioName(e, 'bio')}>
                {profileData.bio || "Clique para adicionar uma biografia..."}
              </p>
            ) : (
              <p className="text-sm text-gray-300 leading-relaxed">{profileData.bio}</p>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              {profileData.tags?.map((tag, i) => <span key={i} className="px-2 py-1 rounded text-xs border border-inknity-purple/30 text-inknity-purple">{tag}</span>)}
            </div>
          </div>

          {/* Coluna Direita (Conteúdo) */}
          <div className="md:w-2/3 p-4">
            <div className="w-full flex text-center text-lg mb-4 border-b border-[#2d1e44]">
              <button onClick={() => setSelectedTab("posts")} className={`w-1/2 py-2 ${selectedTab === "posts" ? "border-b-2 border-inknity-yellow text-inknity-yellow" : "text-gray-400"}`}>Posts</button>
              <button onClick={() => setSelectedTab("commissions")} className={`w-1/2 py-2 ${selectedTab === "commissions" ? "border-b-2 border-inknity-yellow text-inknity-yellow" : "text-gray-400"}`}>Comissões</button>
            </div>

            <main className="w-full space-y-4">
              {posts.filter(p => selectedTab === "posts" ? p.type === "post" : p.type === "commission").map(p => (
                <ContentCardInline key={p.id} item={p} />
              ))}
              {posts.length === 0 && <p className="text-center text-gray-500 mt-10">Nada publicado ainda.</p>}
            </main>
          </div>
        </section>
      </div>

      {/* FAB para criar conteúdo */}
      {isOwner && (
        <button onClick={() => setModal(selectedTab === "posts" ? "post" : "commission")} className="fixed bottom-9 right-9 bg-inknity-purple text-white size-14 rounded-full flex items-center justify-center text-4xl shadow-lg z-50 hover:scale-110 transition">
          +
        </button>
      )}

      {/* Modais */}
      <CreatePostModal open={modal === "post"} onClose={() => setModal(null)} onSubmit={handlePublishPost} />
      <CreateCommissionModal open={modal === "commission"} onClose={() => setModal(null)} onSubmit={handleSubmitCommission} />

      {modal === "zoom" && zoomPost && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setModal(null)}>
          <img src={zoomPost.imageUrl || standard} alt="Zoom" className="max-w-full max-h-full rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default Profile;