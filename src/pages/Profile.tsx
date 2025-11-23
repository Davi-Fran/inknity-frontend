import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { ProfileTag } from "../components/ProfileTag";
import { CommentsModal } from "../components/CommentsModal";
import { CreateCommissionModal } from "../components/CreateCommissionModal";
import { CreatePostModal } from "../components/CreatePostModal";

import standard from "../assets/img/standard.svg";
import userPhotoImg from "../assets/img/userPhoto.png";

type Comment = { id: number; author: string; text: string; createdAt: string };

type PostItem = {
  id: number;
  type: "post" | "commission";
  author: string;
  title: string;
  body?: string;
  imageUrl?: string | null;
  likes: number;
  liked?: boolean;
  comments: Comment[];
  price?: number;
  createdAt: string;
};

// -----------------------------------------------------------------------------
// Profile component (contém ContentCard e modais refatorados)
// -----------------------------------------------------------------------------
const Profile: React.FC = () => {
  const { username } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ----- modal control (unified) -----
  const [modal, setModal] = useState<null | "post" | "commission" | "edit" | "zoom" | "comments" >(null);

  // keep payload states for edit / zoom / comments
  const [editingPost, setEditingPost] = useState<PostItem | null>(null);
  const [zoomPost, setZoomPost] = useState<PostItem | null>(null);

  // comments payload
  const [selectedComments, setSelectedComments] = useState<Comment[]>([]);
  const [currentCommentsPostId, setCurrentCommentsPostId] = useState<number | null>(null);

  // ----- profile info -----
  const [displayName, setDisplayName] = useState("John Doe");
  const [bio, setBio] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor..."
  );
  const [userPhoto, setUserPhoto] = useState<string | null>(userPhotoImg);
  const [isFollowing, setIsFollowing] = useState(false);
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  // tags
  const [tags, setTags] = useState([
    { label: "Medieval", active: true },
    { label: "Steampunk", active: false },
    { label: "Cyberpunk", active: false },
    { label: "Pintura", active: false },
    { label: "Cubismo", active: false },
    { label: "Cartoon", active: false },
  ]);
  const toggleTag = (label: string) =>
    setTags((t) => t.map((tag) => (tag.label === label ? { ...tag, active: !tag.active } : tag)));

  // ----- tab state: 'posts' | 'commissions' -----
  const [selectedTab, setSelectedTab] = useState<"posts" | "commissions">("posts");

  // ----- posts data (estrutura estilo Instagram) -----
  const nextIdRef = useRef(4);
  const genId = () => nextIdRef.current++;

  const [posts, setPosts] = useState<PostItem[]>(() => [
    {
      id: 1,
      type: "post",
      author: "John Doe",
      title: "Minha pintura recente",
      body: "Usei guache dessa vez, ficou bem denso e colorido.",
      imageUrl: standard,
      likes: 3,
      liked: false,
      comments: [{ id: 1, author: "Alice", text: "Linda!", createdAt: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      type: "commission",
      author: "John Doe",
      title: "Comissão: Retrato em aquarela",
      body: "Retrato estilo aquarela, envio em .png 300dpi.",
      imageUrl: standard,
      likes: 0,
      comments: [],
      price: 120,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      type: "post",
      author: "John Doe",
      title: "Sketch rápido",
      body: "Esboço feito em 15 minutos, gostei do resultado.",
      imageUrl: null,
      likes: 1,
      liked: false,
      comments: [],
      createdAt: new Date().toISOString(),
    },
  ]);

  // ----- helpers: CRUD -----
  const handlePublishPost = (data: { title: string; body?: string; imageFile?: File | null }) => {
    const newPost: PostItem = {
      id: genId(),
      type: "post",
      author: displayName,
      title: data.title || "Sem título",
      body: data.body || "",
      imageUrl: data.imageFile ? URL.createObjectURL(data.imageFile) : null,
      likes: 0,
      liked: false,
      comments: [],
      createdAt: new Date().toISOString(),
    };
    setPosts((p) => [newPost, ...p]);
    // close unified modal
    setModal(null);
  };

  const handleSubmitCommission = (data: {
    title: string;
    body?: string;
    price?: number;
    imageFile?: File | null;
  }) => {
    const newCommission: PostItem = {
      id: genId(),
      type: "commission",
      author: displayName,
      title: data.title || "Sem título",
      body: data.body || "",
      imageUrl: data.imageFile ? URL.createObjectURL(data.imageFile) : null,
      likes: 0,
      comments: [],
      price: data.price ?? 0,
      createdAt: new Date().toISOString(),
    };
    setPosts((p) => [newCommission, ...p]);
    setModal(null);
  };

  const deletePost = (id: number) => setPosts((p) => p.filter((x) => x.id !== id));

  // Edit generic: updates title/body/price
  const saveEditedPost = (id: number, update: Partial<Pick<PostItem, "title" | "body" | "price">>) => {
    setPosts((p) => p.map((x) => (x.id === id ? { ...x, ...update } : x)));
    setEditingPost(null);
    setModal(null);
  };

  // Like toggle for posts only (simple increment local)
  const toggleLike = (id: number) => {
  setPosts((prev) =>
    prev.map((post) => {
      if (post.id !== id || post.type !== "post") return post;

      return {
        ...post,
        liked: !post.liked,
        likes: post.liked ? post.likes - 1 : post.likes + 1,
      };
    })
  );
};

  // Comments
  const openCommentsFor = (post: PostItem) => {
    setSelectedComments(post.comments);
    setCurrentCommentsPostId(post.id);
    setModal("comments");
  };

  const addCommentToPost = (postId: number, text: string) => {
    const newComment: Comment = { id: genId(), author: displayName, text, createdAt: new Date().toISOString() };
    setPosts((p) => p.map((x) => (x.id === postId ? { ...x, comments: [...x.comments, newComment] } : x)));
  };

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      posts.forEach((p) => {
        if (p.imageUrl && p.imageUrl.startsWith("blob:")) URL.revokeObjectURL(p.imageUrl);
      });
    };
    // note: we intentionally use no dependency on posts to revoke only on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------------
  // Inline components kept (card + small menus)
  // ---------------------------

  // ContentCardInline (kept inline because você não pediu mover ele para outro arquivo)
  const ContentCardInline: React.FC<{
    item: PostItem;
    onOpenComments: (p: PostItem) => void;
    onDelete: (id: number) => void;
    onEdit: (p: PostItem) => void;
    onZoom: (p: PostItem) => void;
    onToggleLike: (id: number) => void;
  }> = ({ item, onOpenComments, onDelete, onEdit, onZoom, onToggleLike }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
      <div className="p-4 mb-4 bg-inknity-background-2 rounded-xl shadow-lg relative">
        {/* three-dots menu */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="px-2 py-1 rounded hover:bg-[#34264a] transition"
              aria-label="Menu"
            >
              ⋮
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-9 bg-[#2a2040] border border-[#3b2d52] rounded-lg shadow-lg z-50 w-36">
                <button
                  className="w-full block px-3 py-2 text-left hover:bg-[#3f2d63] transition"
                  onClick={() => {
                    onEdit(item);
                    setMenuOpen(false);
                    // open edit modal
                    setEditingPost(item);
                    setModal("edit");
                  }}
                >
                  Editar
                </button>

                <button
                  className="w-full block px-3 py-2 text-left hover:bg-red-500/20 text-red-400 transition"
                  onClick={() => {
                    if (confirm("Tem certeza que deseja excluir este item?")) {
                      onDelete(item.id);
                    }
                    setMenuOpen(false);
                  }}
                >
                  Apagar
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-start">
          {/* Mini banner */}
          <div className="w-1/3 h-auto mr-4 flex items-center justify-center bg-inknity-banner/50 rounded-lg p-4 cursor-pointer" onClick={() => { onZoom(item); setZoomPost(item); setModal("zoom"); }}>
            <img src={item.imageUrl || standard} alt="Imagem de Conteúdo" className="w-full h-auto object-cover opacity-80" />
          </div>

          {/* Texto + Ícones */}
          <div className="w-2/3">
            <p className="text-white text-base font-medium">{item.title}</p>

            <p className="text-sm text-gray-400 mt-1">{item.body}</p>

            {/* price for commissions */}
            {item.type === "commission" && item.price !== undefined && <p className="text-inknity-yellow font-bold text-sm mt-2">R$ {item.price}</p>}

            <div className="flex justify-end items-center mt-3 text-gray-400 gap-4">
              {item.type === "post" && (
                <>
                  {/* Like */}
                  <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-7 hover:text-inknity-purple hover:cursor-pointer transition-all duration-300 
                    ${ item.liked ? "text-red-500" : "text-gray-400" }`}
                      fill={item.liked ? "currentColor" : "none"} onClick={() => toggleLike(item.id)}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C11.285 4.876 9.623 3.75 7.688 3.75 5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                    <p>{item.likes}</p>
                  </div>

                  {/* Comments */}
                  <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => onOpenComments(item)} className="size-7 hover:text-inknity-purple hover:cursor-pointer transition-all duration-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                    <p>{item.comments.length}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <div className="min-h-screen bg-inknity-dark-purple text-white overflow-auto md:w-11/12">
      <header className="relative w-full h-60 bg-[#2a2040] overflow-hidden">
        <img src={bannerImage || standard} alt="Banner" className="w-70 h-60 object-cover opacity-70 mx-auto" />
        <div className="absolute inset-0 bg-black/20"></div>

        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer z-20"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setBannerImage(URL.createObjectURL(file));
          }}
        />

        <Link to={`/user/${username}/feed/foryou`} className="absolute left-5 top-5 z-30">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </Link>
      </header>

      <div className="md:w-11/12 mx-auto p-6">
        <section className="w-full flex flex-col md:flex-row mt-6 gap-6">
          {/* LEFT COLUMN */}
          <div className="md:w-1/3 p-4">
            <div className="size-24 rounded-full border-4 border-[#281b3d] bg-cover bg-center cursor-pointer" style={{ backgroundImage: `url(${userPhoto})` }} onClick={() => document.getElementById("profilePhotoUpload")?.click()} />

            <input
              id="profilePhotoUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setUserPhoto(URL.createObjectURL(file));
              }}
            />

            <div>
              <p className="text-xl font-bold outline-none cursor-text" contentEditable suppressContentEditableWarning onBlur={(e) => setDisplayName(e.currentTarget.textContent || displayName)}>
                {displayName}
              </p>
              <p className="text-sm text-gray-400">@johndoe</p>
            </div>

            <div className="flex items-center space-x-3 my-4">
              <button onClick={() => setIsFollowing(!isFollowing)} className={`w-full py-2 rounded-lg font-semibold text-sm border transition-all duration-200 cursor-pointer ${isFollowing ? "bg-inknity-purple border-inknity-purple text-white" : "border-inknity-purple/50 text-white hover:bg-inknity-purple/20"}`}>
                {isFollowing ? "Seguindo" : "Seguir"}
              </button>
            </div>

            <p className="text-sm text-gray-300 pr-4 leading-relaxed outline-none cursor-text" contentEditable suppressContentEditableWarning onBlur={(e) => setBio(e.currentTarget.textContent || bio)}>
              {bio}
            </p>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:w-2/3 p-4">
            {/* Tabs */}
            <div className="w-full flex text-center text-lg mb-4 border-b border-[#2d1e44]">
              <button onClick={() => setSelectedTab("posts")} className={`w-1/2 py-2 ${selectedTab === "posts" ? "border-b-2 border-inknity-yellow text-inknity-yellow" : "text-gray-400 hover:text-white"}`}>
                Posts
              </button>
              <button onClick={() => setSelectedTab("commissions")} className={`w-1/2 py-2 ${selectedTab === "commissions" ? "border-b-2 border-inknity-yellow text-inknity-yellow" : "text-gray-400 hover:text-white"}`}>
                Comissões
              </button>
            </div>

            {/* TAGS */}
            <div className="w-full flex gap-2 flex-wrap py-2 mb-4 overflow-x-auto">
              {tags.map((tag) => (
                <ProfileTag key={tag.label} label={tag.label} active={tag.active} onClick={() => toggleTag(tag.label)} className={`px-3 py-1 text-sm rounded-full transition-colors ${tag.active ? "bg-inknity-yellow text-[#1c132a] font-semibold" : "bg-[#281b3d] text-gray-300 border border-[#3e3158] hover:bg-[#3e3158]"}`} />
              ))}
            </div>

            {/* LIST */}
            <main className="w-full space-y-4">
              {selectedTab === "posts" &&
                posts
                  .filter((p) => p.type === "post")
                  .map((p) => (
                    <ContentCardInline
                      key={p.id}
                      item={p}
                      onOpenComments={(post) => openCommentsFor(post)}
                      onDelete={(id) => deletePost(id)}
                      onEdit={(post) => { setEditingPost(post); setModal("edit"); }}
                      onZoom={(post) => { setZoomPost(post); setModal("zoom"); }}
                      onToggleLike={(id) => toggleLike(id)}
                    />
                  ))}

              {selectedTab === "commissions" &&
                posts
                  .filter((p) => p.type === "commission")
                  .map((p) => (
                    <ContentCardInline
                      key={p.id}
                      item={p}
                      onOpenComments={() => {}}
                      onDelete={(id) => deletePost(id)}
                      onEdit={(post) => { setEditingPost(post); setModal("edit"); }}
                      onZoom={(post) => { setZoomPost(post); setModal("zoom"); }}
                      onToggleLike={() => {}}
                    />
                  ))}
            </main>
          </div>
        </section>
      </div>

      {/* Floating button */}
      <button onClick={() => (selectedTab === "posts" ? setModal("post") : setModal("commission"))} className="fixed bottom-9 right-9 bg-inknity-purple text-white size-14 rounded-full flex items-center justify-center text-4xl shadow-lg shadow-inknity-purple/40 hover:bg-inknity-purple/80 transition z-50">
        +
      </button>

      {/* MODAIS (agora usando modal unificado) */}
      <CreatePostModal
        open={modal === "post"}
        onClose={() => setModal(null)}
        onSubmit={handlePublishPost}
      />

      <CreateCommissionModal
        open={modal === "commission"}
        onClose={() => setModal(null)}
        onSubmit={handleSubmitCommission}
      />

      {/* EditModal continua inline (se quiser eu extraio pra um arquivo) */}
      {/* open quando modal === "edit" */}
      {/*** Inline EditModal (mantido aqui porque não existe import externo no topo) ***/}
      {modal === "edit" && editingPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setModal(null)}>
          <div className="bg-inknity-background-2 p-6 rounded-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">Editar {editingPost.type === "commission" ? "Comissão" : "Post"}</h3>

            <input defaultValue={editingPost.title} id="__edit-title" placeholder="Título" className="w-full mb-2 p-2 rounded bg-[#241c3a] text-white outline-none" />

            <textarea defaultValue={editingPost.body} id="__edit-body" placeholder="Descrição" className="w-full h-32 p-3 rounded bg-[#241c3a] text-white outline-none" />

            {editingPost.type === "commission" && (
              <input defaultValue={editingPost.price ?? ""} id="__edit-price" type="number" placeholder="Preço (R$)" className="w-full mt-2 p-2 rounded bg-[#241c3a] text-white outline-none" />
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => { setModal(null); setEditingPost(null); }} className="text-gray-300 hover:text-white">
                Cancelar
              </button>
              <button
                onClick={() => {
                  const titleEl = (document.getElementById("__edit-title") as HTMLInputElement | null);
                  const bodyEl = (document.getElementById("__edit-body") as HTMLTextAreaElement | null);
                  const priceEl = (document.getElementById("__edit-price") as HTMLInputElement | null);

                  saveEditedPost(editingPost.id, {
                    title: titleEl?.value ?? editingPost.title,
                    body: bodyEl?.value ?? editingPost.body,
                    price: priceEl ? Number(priceEl.value || 0) : editingPost.price,
                  });
                }}
                className="bg-inknity-purple px-4 py-2 rounded-lg"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CommentsModal usa modal === 'comments' */}
      <CommentsModal
        open={modal === "comments"}
        comments={selectedComments}
        onClose={() => setModal(null)}
        onSubmit={(text) => currentCommentsPostId && addCommentToPost(currentCommentsPostId, text)}
      />

      {/* Zoom modal inline (mantido aqui) */}
      {modal === "zoom" && zoomPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setModal(null)}>
          <div className="bg-inknity-background-2 rounded-xl shadow-xl max-w-4xl w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {zoomPost.imageUrl ? <img src={zoomPost.imageUrl} alt={zoomPost.title} className="w-full max-h-[70vh] object-contain bg-black" /> : null}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{zoomPost.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{zoomPost.author} • {new Date(zoomPost.createdAt).toLocaleString()}</p>
                </div>

                {zoomPost.type === "commission" && zoomPost.price !== undefined && <div className="text-inknity-yellow font-bold text-lg">R$ {zoomPost.price}</div>}
              </div>

              {zoomPost.body && <p className="text-gray-300 mt-3">{zoomPost.body}</p>}

              <div className="mt-4 flex items-center gap-4 text-gray-400">
                {zoomPost.type === "post" && (
                  <>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                      <span>{zoomPost.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                      </svg>
                      <span>{zoomPost.comments.length}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
