import React, { useState, useEffect } from "react";
import TracksCollection from "./TracksCollection";
import TrackDetails from "./TrackDetails";
import TrackForm from "./TrackForm";
import { useNavigate } from "react-router-dom"
import koopa from "./assets/KoopaBeach.jpg"

export default function TracksContainer () {
    const [ userAdmin, setUserAdmin ] = useState([])
    const [ tracks, setTracks ] = useState([]);
    const [ selectedTrackId, setSelectedTrackId ] = useState(null);
    const [ searchQuery, setSearchQuery ] = useState("");
    const navigate = useNavigate();

    const {admin, id} = userAdmin

    useEffect(() => {
      const currentDriver = sessionStorage.getItem("user_id")
      if (currentDriver == null){
          navigate("/login")
      }else{
        fetch(`/tracks`)
        .then((res) => res.json())
        .then((tracks) => setTracks(tracks));
      }
    },[setTracks]);

    useEffect(() => {
      const currentDriver = sessionStorage.getItem("user_id")
      if (currentDriver == null){
          navigate("/login")
      }else{
          fetch(`/drivers/${currentDriver}`)
          .then((res) => res.json())
          .then((user) => setUserAdmin(user))
      }
  },[]);

    const addTrack = (newTrack) => {
        setTracks(tracks => [...tracks,newTrack])
    }

    const selectedTrack = tracks.find((track) => track.id === selectedTrackId)

    const handleSelectTrack = (track) => {
        setSelectedTrackId(track.id)
    }

    const tracksToDisplay = tracks.filter((track) => 
          track.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const removeTrack = (id) => {
      fetch(`/tracks/${id}`, {
        method: "DELETE"
      })
      const newTracks = tracks.filter((track) => track.id !== id)
        setTracks(newTracks)
    }

    return ( 
    <div>
        <div>
          {selectedTrack ? <TrackDetails track={selectedTrack} admin={admin} id={id} removeTrack={removeTrack}/> : <img src={koopa} alt="track" className="absolute top-[20%] left-[39%] w-72 h-64 mb-32 mx-2 rounded-xl pb-2"/>}
        </div>
        <div>
          {admin ? <TrackForm addTrack={addTrack}/> : <></>}
          {/* <TrackForm addTrack={addTrack}/> */}
          {/* {admin} */}
        </div>
        <div>
          <TracksCollection 
            tracks={tracks}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery} 
            onClickTrack={handleSelectTrack}
          />
        </div>
    </div>
    );
}