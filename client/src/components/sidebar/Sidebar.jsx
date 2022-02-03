import React, { useEffect, useState } from 'react';
import './sidebar.css';
import { useSearch } from '../../context/SearchContext';
import axios from 'axios';
import CloseFriend from '../closeFriend/CloseFriend';

const Sidebar = () => {
  const [people, setPeople] = useState([]);
  const { searchText, setSearchText } = useSearch();

  useEffect(() => {
    const getpeople = async () => {
      try {
        const friendList = await axios.get('/api/users/all/every');
        setPeople(friendList.data);
        setPeople(
          friendList.data.filter((user) =>
          searchText && searchText.length !== 0 &&  user.username.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      } catch (err) {
        console.log(err);
      }
    };
    getpeople();
  }, [searchText]);
  // useEffect(() => {

  // }, [searchText])
  // if (people) {
  //   return (
  //     <div className={`${!searchText && 'none'} search-results`}>
  //       {people.map((u) => (
  //         <CloseFriend key={u._id} user={u} />
  //       ))}
  //     </div>
  //   );
  // } else {
  return <div className="none" />;
  // }
};

export default Sidebar;
