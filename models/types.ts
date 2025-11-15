import mongoose from "mongoose";

type SkillType = "Attacking" | "Defending" | "Goalkeeping" | "Playmaking";
type RatingType = "Average" | "Good" | "Excellent";
type RoleType = "Player" | "Admin";

export interface IPlayer {
  name: string;
  skill: SkillType;
  rating: RatingType;
  playerScore: string;
  role: RoleType;
  createdAt: Date;
  updatedAt: Date;
  telegramId: string;
  contactNumber?: string;
}
export interface IVoteResponse {
  userId: string; // references Player.telegramId or Player._id
  pollId: mongoose.Types.ObjectId; // reference to Poll
  vote: "yes" | "no";
  timestamp: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPoll {
  _id: mongoose.Types.ObjectId;
  date: Date;
  status: "open" | "closed";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITeams {
  pollId: mongoose.Types.ObjectId; // reference to Poll
  teamName: string;
  color: string;
  captainId: string; // references Player.telegramId or Player._id
  memberIds: string[]; // array of Player.telegramId or Player._id
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGameHistory {
  pollId: mongoose.Types.ObjectId; // reference to Poll
  date: Date;
  teamA: string[];
  teamB: string[];
  result: string;
}
