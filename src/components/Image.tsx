import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react"
import styled from "styled-components"
export type ImageType = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  isLoading?: boolean
}

export default function Image(props: ImageType) {
  const { isLoading = false } = props
  const [loading, setLoading] = useState(false)
  const onLoad = useCallback(() => {
    setLoading(false)
  }, [])

  const onError = useCallback(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    setLoading(true)
  }, [props.src])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return (
    <ImageWrapper
      loading={loading}
      className={`image-comp ${loading ? "loading" : "loaded"}`}
    >
      <img
        onLoad={onLoad}
        src={props.src}
        alt={props?.alt}
        onError={onError}
        {...props}
      />
    </ImageWrapper>
  )
}
const ImageWrapper = styled.div<{
  loading: boolean
}>`
  position: relative;
  width: 100%;
  height: 100%;

  &.loading {
    &:before {
      opacity: 1;
      visibility: visible;
    }
  }

  &:before {
    position: absolute;
    left: 50%;
    top: 50%;
    border: 2px solid transparent;
    border-radius: 50%;
    border-top: 2px solid #255b87;
    border-right: 2px solid #255b87;
    width: 30px;
    height: 30px;
    /* -webkit-animation: spin 2s linear infinite; Safari */
    // animation-name: rotation;
    // animation-duration: 2s;
    // animation-iteration-count: infinite;
    // animation-timing-function: linear;
    // animation-delay: 0.01s;
    // -webkit-animation-name: rotation;
    // -webkit-animation-duration: 2s;
    // -webkit-animation-iteration-count: infinite;
    // -webkit-animation-timing-function: linear;
    // -webkit-animation-delay: 0.01s;

    // animation: spin 2s linear infinite;
    -webkit-animation: rotation 2s infinite linear;
    animation: rotation 2s infinite linear;
    content: "";
    margin: -15px 0 0 -15px;
    opacity: 0;
    visibility: hidden;
    /* transition: all 0.4s ease; */
    z-index: 100;
  }

  img {
    max-width: 100%;
  }
`
