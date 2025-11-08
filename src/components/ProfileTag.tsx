type ProfileTagProps = {
  label: string
  active: boolean
  onClick: () => void
}

export const ProfileTag = ({ label, active, onClick }: ProfileTagProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm
        ${active
          ? 'bg-inknity-purple text-inknity-dark-purple shadow-[0_0_6px] shadow-inknity-purple'
          : 'bg-inknity-dark-purple text-inknity-purple border border-inknity-purple hover:bg-inknity-purple/70'
        }`}
    >
      {label}
    </button>
  )
}
