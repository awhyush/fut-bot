type SkillType = "Attacking" | "Defending" | "Goalkeeping" | "Playmaking";
type RatingType = "Average" | "Good" | "Excellent";
type RoleType = "Player" | "Admin";

export interface IPlayer extends Document {
  name: string;
  skill: SkillType;
  rating: RatingType;
  playerScore: string; // Keeping as string as per original schema
  userId?: string; // Optional field
  role: RoleType;
}
