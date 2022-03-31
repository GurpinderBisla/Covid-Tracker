import { Button } from "@chakra-ui/button";
import { Flex, Heading, Stack, Spacer } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import covidlogo from '../pages/covidlogo.png';

/**
 * A simple header that holds no state.
 * @returns Header Component
 */
const Header = () => {
  return (
    <Flex
      padding={2}
      align="center"
      borderBottom="1px"
      borderBottomColor="gray.100"
      position="sticky"
    >
      <Link to="/">
        <img src={covidlogo} alt="covid website logo"></img>
      </Link>
      <Heading letterSpacing="tighter">Another Covid Tracker</Heading>

      <Spacer />
      <Stack direction="row">
        {createMenu("Canada", ["Provincial", "Vaccine Tracker"])}
        {createMenu("Global", ["Country Stats", "Compare Countries"])}
      </Stack>
    </Flex>
  );
};

/**
 * Creates a drop down menu with a given name, and an array of menu item names,
 * each menu item redirects the user to an url of the same name
 * @param {String} menuName - The label for the menus's button
 * @param {String Array} menuItems - An array containing the name of all the menu's items
 * @returns
 */
const createMenu = (menuName, menuItems) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {menuName}
      </MenuButton>

      <MenuList>
        {menuItems.map((x) => {
          return (
            <Link to={("/" + menuName + "/" + x).replace(/ /g, "")} key={x}>
              <MenuItem>{x}</MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default Header;
