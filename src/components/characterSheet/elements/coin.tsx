import { Label } from "@radix-ui/react-label";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import type { CharacterForm } from "~/components/characterSheet/characterTypes";

export default function CharacterCoin(props: {
  coins: string;
  saveCharacter: SubmitHandler<CharacterForm>;
}) {
  const { coins, saveCharacter } = props;
  const { register, handleSubmit } = useFormContext();

  return (
    <li className="flex items-center">
      <Label className="rounded-lg border-2 border-r-0 border-black p-[3px]" htmlFor={coins}>
        {coins}
      </Label>
      <input
        type="number"
        {...register(coins, { valueAsNumber: true,  onBlur: handleSubmit(saveCharacter) })}
        placeholder="0"
        className="h-10 w-14 rounded-xl border-2 border-black text-center mr-4"
        id={coins}
        name={coins}
      />
    </li>
  );
}
