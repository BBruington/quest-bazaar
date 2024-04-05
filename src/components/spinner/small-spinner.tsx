import { Loader2 } from "lucide-react";

export default function SmallSpinner() {
  return (
    <div className="flex items-center justify-center text-white">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
