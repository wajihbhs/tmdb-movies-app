import { describe, it, expect, beforeEach } from "vitest";
import { useMovieComments } from "~/composables/useMovieComments";

describe("useMovieComments", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should add a comment and retrieve it by movieId", () => {
    const { comments, add } = useMovieComments(123);

    add({
      username: "wajih",
      message: "Très bon film",
      rating: 5,
      movieId: 123
    });
    expect(comments.value).toHaveLength(1);
    expect(comments.value[0].username).toBe("wajih");
    expect(comments.value[0].rating).toBe(5);
  });
});
