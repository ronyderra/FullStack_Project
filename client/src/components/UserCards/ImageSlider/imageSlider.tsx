import "./imageSlider.css"
import React from "react";
import { Carousel } from "react-bootstrap";

const ImageSlider = ({ info }) => {
    return (
        <div className="carouselComp">
            <Carousel>
                {info.map((e) => {
                    return (<Carousel.Item key={e.id}>
                        <img
                            className="image"
                            src={e.image}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3 className="title">{e.destination}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>)
                })}
            </Carousel>
        </div>
    )
}
export default ImageSlider





