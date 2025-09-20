type Props = { label: string ; active: boolean }

export const Tag = ({ label, active }: Props) => {
    return <h1>{label}</h1>
}