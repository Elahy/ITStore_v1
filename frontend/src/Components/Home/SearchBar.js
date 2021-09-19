import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { requestProductList } from "../../store/action/productAction";
import { Link } from "react-router-dom";
import styles from "./SearchBar.module.css";

const useStyles = makeStyles({
  input: {
    width: "300px",
    height: "30px",
    fontSize: "18px",
    padding: "4px 3px 3px 10px",
    fontFamily: "Arial, Helvetica, sans-serif",
    backgroundColor: "#F5F5F5",
    border: "1px solid #F5F5F5",
  },
  dataResult: {
    marginTop: "5px",
    width: "300px",
    height: "200px",
    backgroundColor: "#ffffff",
    zIndex: 500,
    position: "absolute",
    overflow: "hidden",
    overflowY: "auto",
    boxShadow: "rgba(0,0,0,0.35) 0px 5px 15px ",
    verticalAlign: "top",
  },
  dataItem: {
    width: "100%",
    height: "40px",
    display: "flex",
    alignItems: "center",
    color: "black",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "lightgrey",
    },
  },
  item: {
    marginLeft: "10px",
    paddingTop: "15px",
  },
});

function SearchBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleFliter = (e) => {
    const searchWord = e.target.value;
    // setSearchTerm(searchTerm);
    const newFiter = productList.filter((product) => {
      return product.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    searchWord === "" ? setFilteredData([]) : setFilteredData(newFiter);
  };
  const closeHandler = () => {
    setFilteredData([]);
  };

  useEffect(() => {
    dispatch(requestProductList());
  }, [dispatch]);

  const { productList } = useSelector((store) => store.productStore);
  return (
    <div className={styles.search}>
      <div className={styles.searchInputs}>
        <input
          className={classes.input}
          type="text"
          //   value={searchTerm}
          onChange={handleFliter}
          placeholder="Search..."
        />
        <div className={styles.Icon}>
          {filteredData.length === 0 ? (
            <img
              src="./images/search.svg"
              alt="search"
              className={styles.searchIcon}
            />
          ) : (
            <img
              src="./images/close.svg"
              alt="search"
              className={styles.searchIcon}
              onClick={closeHandler}
            />
          )}
        </div>
      </div>
      {filteredData.length === 0 ? null : (
        <div className={classes.dataResult}>
          {filteredData.map((product, key) => (
            <Link to={`/products/${product._id}`} className={classes.dataItem}>
              <p className={classes.item}> {product.title} </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
