import { createSupabaseServerClient } from "@/lib/supabase";
import { GameCollectionButton } from "@/ui/organisms";
import { GameFromIGDB } from "@/types/igdb";

// Collection Button component - only renders for authenticated users
export default async function CollectionButton({
  gameData,
}: {
  gameData: GameFromIGDB;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return <GameCollectionButton gameData={gameData} />;
}
