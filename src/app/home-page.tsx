import Posts from "~/components/posts/page";
import { Button } from "~/components/ui/button";
export default function Home() {

  return (
    <>
    <Button variant="destructive">Button</Button>
      <Posts />
    </>
  );
}