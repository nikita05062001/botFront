import React, { useEffect, useState } from 'react';
import "./ComandList.scss";
import axios from 'axios';
// import { List } from  '../../api/getList';


const ComandList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get('https://script.google.com/macros/s/AKfycbzcFkt--B7LRQO17fXLw0_wqZ4RO0FtTr9qqWo5VDw0wZrbJnA4n6k8VGsUBzFMgH_P/exec');
        setList(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);

  console.log(list.list)
  return (
    <div className="list">
      <div className="list-content">
        <ul>
          <li>/start</li>
          <li>/help</li>
          <li>/authorization</li>
        </ul>
      </div>
    </div>
  );
};

export default ComandList;
