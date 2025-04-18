import type { CastMember } from "~/types/castMember";
import type { CrewMember } from "~/types/crewMember";

export interface MovieCreditsResponse {
  cast: CastMember[];
  crew: CrewMember[];
}
