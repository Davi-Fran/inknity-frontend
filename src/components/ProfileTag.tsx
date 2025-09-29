type Props = { label: string, active: boolean }
export const ProfileTag = ({ label, active }: Props) => {
    return (
        <div className={`flex items-center rounded-full px-5 py-4 bg-gray-700 ${active ? 'bg-inknity-purple' : ''}`}>
            {label}
        </div>
    )
}