interface Props {
  title: string;
  value: string | number;
}

export function Label({ title, value }: Props) {
  return (
    <div className={"w-full flex flex-row justify-between items-center"}>
      <p className={"text-sm text-gray-500"}>{title}</p>
      <p className={"text-lg"}>{value}</p>
    </div>
  );
}
