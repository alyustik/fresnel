import React, { CSSProperties } from "react"
import { Media } from "./Media"

const Box: CSSProperties = {
  width: "200px",
  height: "200px",
  textAlign: "center",
  verticalAlign: "middle",
}

const BreakpointStyle: CSSProperties = {
  ...Box,
  fontSize: "92px",
  lineHeight: "200px",
}

const ExtraSmallStyle: CSSProperties = {
  ...BreakpointStyle,
  backgroundColor: "green",
}

const SmallStyle: CSSProperties = {
  ...BreakpointStyle,
  backgroundColor: "yellow",
}

const MediumStyle: CSSProperties = {
  ...BreakpointStyle,
  backgroundColor: "orange",
}

const LargeStyle: CSSProperties = {
  ...BreakpointStyle,
  backgroundColor: "red",
}

// From https://www.smashingmagazine.com/2013/07/simple-responsive-images-with-css-background-images/
const Img: React.FunctionComponent<
  { src: string; aspectRatio: number } & React.HTMLProps<HTMLSpanElement>
> = ({ src, aspectRatio, style, ...props }) => (
  <span
    {...props}
    style={{
      width: "100%",
      display: "inline-block",
      fontSize: "0",
      lineHeight: "0",
      verticalAlign: "middle",
      backgroundSize: "100%",
      backgroundPosition: "50% 50%",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${src})`,
      ...style,
    }}
  >
    <span
      style={{
        display: "block",
        height: "0",
        paddingTop: `${(aspectRatio * 100).toFixed(2)}%`,
      }}
    />
  </span>
)

export const App: React.FunctionComponent = () => (
  <div>
    <div>
      <h1>
        Default <code>&lt;div&gt;</code> container
      </h1>
      <Media at="xs">
        <div style={ExtraSmallStyle}>xs</div>
      </Media>
      <Media at="sm">
        <div style={SmallStyle}>sm</div>
      </Media>
      <Media at="md">
        <div style={MediumStyle}>md</div>
      </Media>
      <Media greaterThan="md">
        <div style={LargeStyle}>lg</div>
      </Media>
    </div>
    <div>
      <h1>
        Custom <code>&lt;li&gt;</code> container by utilizing render prop
      </h1>
      <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
        {/* prettier-ignore
         *
         * These line-items can’t be wrapped by a div, so use a render prop to
         * receive the class name and a hint as to wether children should be
         * rendered.
         */}
        <Media lessThan="sm">
          {(className, renderChildren) => (
            <li className={className} style={ExtraSmallStyle}>
              {renderChildren ? `xs` : null}
            </li>
          )}
        </Media>
        <Media between={["sm", "lg"]}>
          {(className, renderChildren) => (
            <>
              <li
                className={className}
                style={{
                  ...SmallStyle,
                  height: "100px",
                  lineHeight: "100px",
                }}
              >
                {renderChildren ? `sm` : null}
              </li>
              <li
                className={className}
                style={{
                  ...MediumStyle,
                  height: "100px",
                  lineHeight: "100px",
                }}
              >
                {renderChildren ? `md` : null}
              </li>
            </>
          )}
        </Media>
        <Media greaterThanOrEqual="lg">
          {(className, renderChildren) => (
            <li className={className} style={LargeStyle}>
              {renderChildren ? `lg` : null}
            </li>
          )}
        </Media>
      </ul>
    </div>
    <div>
      <h1>Interaction</h1>
      <Media interaction="hover">
        <div
          style={{
            ...Box,
            fontSize: "40px",
            lineHeight: "50px",
            backgroundColor: "purple",
          }}
        >
          I’m not visible on touch devices!
        </div>
      </Media>
      <Media interaction="notHover">
        <div
          style={{
            ...Box,
            fontSize: "40px",
            lineHeight: "50px",
            backgroundColor: "blue",
          }}
        >
          Oh well hello there, touch devices!
        </div>
      </Media>
    </div>
    <div>
      <h1>Example of not loading hidden images</h1>
      <Media lessThan="md">
        <Img
          aspectRatio={1.261044176706827}
          src="https://d32dm0rphc51dk.cloudfront.net/JAo7pAN1p63YwolybeZgOg/small.jpg"
          style={{ width: "100px" }}
        />
      </Media>
      <Media at="md">
        <Img
          aspectRatio={1.261044176706827}
          src="https://d32dm0rphc51dk.cloudfront.net/JAo7pAN1p63YwolybeZgOg/medium.jpg"
          style={{ width: "400px" }}
        />
      </Media>
      <Media at="lg">
        <Img
          aspectRatio={1.261044176706827}
          src="https://d32dm0rphc51dk.cloudfront.net/JAo7pAN1p63YwolybeZgOg/large.jpg"
          style={{ width: "800px" }}
        />
      </Media>
    </div>
  </div>
)
