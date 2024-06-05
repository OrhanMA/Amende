export default function Notice({
  variant = "info",
  title,
  text,
}: {
  variant: "info" | "danger" | "success";
  title: string;
  text: string;
}) {
  let variantClasses = "";
  const danger = "text-red-600 bg-red-200 border-red-500";
  const info = "text-sand-100 bg-ultramarine-400 border-ultramarine-600";
  const success = "text-sand-100 bg-green-500 border-green-600";
  switch (variant) {
    case "info":
      variantClasses = info;
      break;
    case "danger":
      variantClasses = danger;
      break;
    case "success":
      variantClasses = success;
      break;
    default:
      variantClasses = info;
      break;
  }
  return (
    <div
      className={`max-w-[800px] w-full p-6 my-4 border-l-4 flex flex-col gap-2 ${variantClasses}`}
    >
      <p className="font-semibold text-lg md:text-xl">{title}</p>
      <p className="text-xs sm:text-sm">{text}</p>
    </div>
  );
}
