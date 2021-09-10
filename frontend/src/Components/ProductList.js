import React, { useEffect } from "react";
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
    margin: "20px",
  },
  options: {
    marginLeft: "190px",
  },
});

function ProductList() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { productStore, loaderStore, categoryStore } = useSelector(
    (store) => store
  );
  const productList = productStore.productList;
  const categoryList = categoryStore.categoryList;

  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestCategoryList());
    dispatch(requestProductList());
  }, [dispatch]);

  const handleSelect = (e) => {
    dispatch(setLoaderValue(true));
    dispatch(requestProductByCategory(e));
  };

  console.log(productList);
  const buttonHanlder = (e) => {
    history.push(`/products/${e}`);
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
                className={classes.selectButton}
                variant="contained"
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
              {productList.map((product) => (
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
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

export default ProductList;
