import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center text-white">
      <Loader2 className="h-32 w-32 animate-spin" />
    </div>
  );
}
