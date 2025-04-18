<script setup lang="ts">
import type { CastMember } from "~/types/castMember";
import type { CrewMember } from "~/types/crewMember";

const props = defineProps<{
  cast: CastMember[];
  crew: CrewMember[];
}>();

const { $posterUrl } = useNuxtApp();

const director = computed(() => props.crew.find(person => person.job === "Director"));

const topCast = computed(() => props.cast.slice(0, 6)); // top d'affiche 6 premiers acteurs
</script>

<template>
  <div class="mt-2">
    <div v-if="director" class="mb-4">
      <h1 class="text-xl font-bold mb-2">🎬 {{ $t("director") }}</h1>
      <p class="text-gray-700 font-weight-bold uppercase">{{ director.name }}</p>
    </div>
    <div>
      <h2 class="text-xl font-bold mb-4">⭐ {{ $t("top-cast") }}</h2>
      <v-row dense>
        <v-col v-for="actor in topCast" :key="actor.id" cols="6" sm="4" md="2">
          <div class="text-center">
            <core-base-image
              :src="$posterUrl(actor.profile_path)"
              :alt="actor.name"
              class="w-full h-[180px] object-cover mb-2"
              cover
            />
            <p class="text-sm font-semibold">{{ actor.name }}</p>
            <p class="text-xs text-gray-600 italic">{{ actor.character }}</p>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
