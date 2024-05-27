export const NegativeTag = ({ text }: { text: string }) => {
  return (
    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md">{text}</span>
  )
}

export const PositiveTag = ({ text }: { text: string }) => {
  return (
    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md">
      {text}
    </span>
  )
}

export const NeutralTag = ({ text }: { text: string }) => {
  return (
    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
      {text}
    </span>
  )
}
