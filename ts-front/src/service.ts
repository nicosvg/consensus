import axios from "axios";
import config from "@/config";
import { Ballot, Election } from "@/types";

const fetchElections = async (): Promise<Election[]> => {
  try {
    const response = await axios.get(config.rootApi + "/elections");
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const searchElectionByCode = async (code: string): Promise<Election | null> => {
  try {
    const response = await axios.get(
      `${config.rootApi}/elections?code=${code}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const fetchResults = async (electionId: string): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${config.rootApi}/elections/${electionId}/results`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const sendVote = async (electionId: string, ballot: Ballot): Promise<void> => {
  try {
    const response = await axios.post(
      `${config.rootApi}/elections/${electionId}/vote`,
      ballot
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export { fetchElections, sendVote, fetchResults, searchElectionByCode };
