import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Box>
      <Link to="/">
        <Text fontWeight="bolder" fontSize="4xl" fontFamily="cursive">
          CONNECTO
        </Text>
      </Link>
    </Box>
  );
};

export default Logo;
