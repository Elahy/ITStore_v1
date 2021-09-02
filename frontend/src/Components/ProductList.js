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
import { requestProductList } from "../store/action/productAction";
import { setLoaderValue } from "../store/action/loaderAction";
import Loader from "./Loader";
import AddToCart from "../ReComponent/AddToCart";

const useStyles = makeStyles({
  root: {
    width: 300,
    margin: "1%",
  },
  media: {
    height: 400,
  },
  detailsButton: {
    backgroundColor: "#04b4c4",
  },
});

function ProductList() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { productStore, loaderStore } = useSelector((store) => store);
  const productList = productStore.productList;

  useEffect(() => {
    dispatch(setLoaderValue(true));
    dispatch(requestProductList());
  }, [dispatch]);
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
