import axios from "axios";

class TripServices {
  saveTrip(trip) {
    console.log(trip);
    return axios.post("http://localhost:8085/user/createtrip", trip, {
      headers: {
        Authorization: localStorage.jwtToken,
        "Content-Type": "application/json",
      },
    });
  }

  GetmatchTrip(tripId) {
    console.log(tripId);

    return axios.get("http://localhost:8085/user/matchtrips/" + tripId, {
      headers: {
        Authorization: localStorage.jwtToken,
        //"Content-Type": "application/json",
      },
    });
  }
}

export default new TripServices();
