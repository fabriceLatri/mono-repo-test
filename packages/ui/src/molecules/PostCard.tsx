

type PostCardProps = React.PropsWithChildren & {
  title: string;
  description: string;
}

export function PostCard({ title, description }: PostCardProps) {
  return (
  <div className="flex flex-col gap-4 w-full p-4 shadow-xl rounded-2xl">
    <span className="font-medium text-2xl">{title}</span>
    <span className="font-medium text-gray-600 dark:text-gray-400">{description}</span>
  </div>
  )
}