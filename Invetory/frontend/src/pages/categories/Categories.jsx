import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/category', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error.response?.data || error.message);
      }
    };

    fetchCategories();
  }, [user.token]);

  const handleCategoryClick = (categoryName) => {
    navigate(`/categories/${categoryName}/products`);
  };

  return (
    <div className={styles.container}>
      {categories.map((category) => (
        <div
          key={category._id}
          className={styles.card}
          onClick={() => handleCategoryClick(category.name)}
        >
          <h2>{category.name}</h2>
          <p>{category.description || 'No description available.'}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
