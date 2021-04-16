// @flow
import * as React from "react";

type Props = {
  size?: number,
  fill?: string,
  className?: string,
};

function KeycloakLogo({ size = 34, fill = "#FFF", className }: Props) {
  return (
    <svg
      width={400}
      height={400}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g>
      <path id="path0" d="M82.266 77.174 C 69.676 99.008,59.375 117.280,59.375 117.779 C 59.375 118.277,73.409 118.876,90.562 119.108 L 121.748 119.531 99.190 158.594 C 73.295 203.434,74.721 198.623,82.922 213.480 C 90.750 227.660,90.063 227.719,99.050 212.109 C 103.132 205.020,116.969 181.289,129.800 159.375 C 142.631 137.461,156.468 113.735,160.549 106.651 C 169.561 91.007,168.472 91.033,177.249 106.250 L 184.459 118.750 200.433 118.710 L 216.406 118.671 223.438 105.820 L 230.469 92.969 246.875 92.549 L 263.281 92.130 270.806 105.440 L 278.330 118.750 311.431 118.726 C 329.636 118.713,343.628 118.129,342.524 117.428 C 341.420 116.728,330.429 98.633,318.099 77.218 L 295.682 38.281 200.419 37.879 L 105.157 37.476 82.266 77.174 M239.640 240.571 L 216.406 281.142 200.493 281.196 L 184.580 281.250 177.056 294.560 L 169.531 307.870 153.183 307.451 L 136.834 307.031 129.270 294.141 L 121.706 281.250 90.541 281.250 C 73.400 281.250,59.375 281.699,59.375 282.247 C 59.375 282.796,69.664 301.083,82.239 322.884 L 105.103 362.524 200.392 362.121 L 295.682 361.719 318.169 322.656 L 340.656 283.594 370.719 282.761 C 394.274 282.109,387.548 281.855,339.644 281.589 L 278.507 281.250 270.823 294.141 L 263.139 307.031 247.258 307.476 L 231.376 307.920 261.150 256.043 C 277.525 227.511,291.283 203.229,291.722 202.083 C 292.354 200.437,289.409 200.000,277.698 200.000 L 262.874 200.000 239.640 240.571 " stroke="none" fill="#fff" fill-rule="evenodd"></path>
      </g>
    </svg>
  );
}

export default KeycloakLogo;
