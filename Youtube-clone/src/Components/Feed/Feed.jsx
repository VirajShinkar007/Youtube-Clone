
import React, { useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment'

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(videoList_url)
      .then(response => response.json())
      .then(data => setData(data.items)) // Fixed typo: `data.item` should be `data.items`.
      .catch(error => console.error('Error fetching data:', error)); // Added error handling for better debugging.
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed"> 
      {data.map((item) => (
        <Link to={`video/${item.snippet.categoryID}/${item.id}`} className="card" key={item.id}>
          <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
          <h2>{item.snippet.title}</h2> {/* Dynamically display video title */}
          <h3>{item.snippet.channelTitle}</h3> {/* Dynamically display channel name */}
          <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p> {/* Display views and formatted date */}
        </Link>
      ))}
    </div>
  );
};

export default Feed;