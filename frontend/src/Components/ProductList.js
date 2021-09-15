import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  requestProductByCategory,
  requestProductList,
} from "../store/action/productAction";
import { requestCategoryList } from "../store/action/categoryAction";
import { setLoaderValue } from "../store/action/loaderAction";
import Loader from "./Loader";
import AddToCart from "../ReComponent/AddToCart";
import Pagination from "./Pagination";

const useStyles = makeStyles({
  root: {
    width: 320,
    margin: "10px 25px",
  },
  media: {
    height: "320px",
  },
  detailsButton: {
    backgroundColor: "#04b4c4",
  },
  selectButton: {
    display: "inline-flex",
    margin: "15px",
    color: "#04b4c4",
    border: "1px solid #04b4c4",
  },
  options: {
    marginLeft: "190px",
  },
});

function ProductList() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage /*setPostPerPage */] = useState(8);

  const { productStore, loaderStore, categoryStore } = useSelector(
    (store) => store
  );

  // const productList = productStore.productList;
  const categoryList = categoryStore.categoryList;

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProductList = productStore.productList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  console.log(currentProductList, "===currentProductList");
  console.log(indexOfFirstProduct, "===indexOfFirstProduct");
  console.log(indexOfLastProduct, "===currentProductList");

  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestCategoryList());
    dispatch(requestProductList());
  }, [dispatch]);

  const handleSelect = (categoryId) => {
    dispatch(setLoaderValue(true));
    dispatch(requestProductByCategory(categoryId));
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log(productStore.productList);
  const buttonHanlder = (productId) => {
    history.push(`/products/${productId}`);
  };
  return (
    <>
      {loaderStore.loader ? (
        <Loader />
      ) : (
        <div>
          <div className={classes.options}>
            {categoryList.map((category) => (
              <Button
                key={category._id}
                className={classes.selectButton}
                variant="outlined"
                color="secondary"
                onClick={() => handleSelect(category._id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          <Grid container spacing={3}>
            <Grid item xs={false} lg={1}></Grid>
            <Grid item xs={12} lg={10}>
              {currentProductList.map((product) => (
                <div key={product._id} className="productList">
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={`http://localhost:8080${product.image}`}
                        title={product.title}
                        alt={product.title}
                      />

                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {product.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {product.category.name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h4">
                          Price: {product.price}Tk
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <AddToCart product={product} />
                      <Button
                        onClick={() => buttonHanlder(product._id)}
                        className={classes.detailsButton}
                        variant="contained"
                        color="primary"
                      >
                        See Details
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              ))}
              <Pagination
                productPerPage={productPerPage}
                totalProducts={productStore.productList.length}
                paginate={paginate}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

export default ProductList;
