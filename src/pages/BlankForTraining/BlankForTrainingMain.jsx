import { useState } from "react";
import Container from "../../components/UI/Container/Container";
import { Title } from "../../styles/styles";
import { mockUsers } from "../../db/mock-factor";

import { Avatar, AvatarGroup, Divider } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";

import { Table, Button } from "rsuite";
import { useNavigate } from "react-router-dom";

const { Column, HeaderCell, Cell } = Table;
const users = mockUsers(10);
const max = 4;

const BlankForTrainingMain = () => {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getData = () => {
    if (sortColumn && sortType) {
      return users.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return users;
  };

  const addDataHandler = () => {
    navigate("/blankForTraining/new");
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  return (
    <Container>
      <Title>Blank For training</Title>

      <Divider>Avatar Group</Divider>

      <AvatarGroup stack style={{ margin: "10px" }}>
        {users.map((user, index) => (
          <Avatar circle key={index} src={user.avatar} alt={user.firstName} />
        ))}
      </AvatarGroup>

      <AvatarGroup stack style={{ margin: "10px" }}>
        {users
          .filter((_, i) => i < max)
          .map((user, index) => (
            <Avatar circle key={index} src={user.avatar} alt={user.firstName} />
          ))}
        <Avatar circle style={{ background: "#111" }}>
          +{users.length - max}
        </Avatar>
      </AvatarGroup>

      <Divider>Table with sort</Divider>
      <div style={{ textAlign: "right" }}>
        <Button
          type="button"
          onClick={addDataHandler}
          className="button-with-icon"
          style={{ textAlign: "right" }}
        >
          <PlusIcon className="fa-align" /> Add new data
        </Button>
      </div>

      <Table
        // height={420}
        autoHeight
        data={getData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
        rowClassName="cursor-pointer"
        onRowClick={(rowData) => {
          navigate(`/blankForTraining/${rowData.id}`);
        }}
      >
        <Column width={70} align="center" fixed sortable>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={150} fixed sortable>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={100} sortable>
          <HeaderCell>Gender</HeaderCell>
          <Cell dataKey="gender" />
        </Column>

        <Column width={100} sortable>
          <HeaderCell>Age</HeaderCell>
          <Cell dataKey="age" />
        </Column>

        <Column width={130} sortable>
          <HeaderCell>City</HeaderCell>
          <Cell dataKey="city" />
        </Column>

        <Column width={130} sortable>
          <HeaderCell>Street</HeaderCell>
          <Cell dataKey="street" />
        </Column>

        <Column width={250} sortable>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>
      </Table>

      <Divider>Simple table</Divider>
      <Table
        // height={400}
        autoHeight
        data={users}
        onRowClick={(rowData) => {
          console.log(rowData);
        }}
      >
        <Column width={60} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={150}>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column width={150}>
          <HeaderCell>Last Name</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>

        <Column width={100}>
          <HeaderCell>Gender</HeaderCell>
          <Cell dataKey="gender" />
        </Column>

        <Column width={100}>
          <HeaderCell>Age</HeaderCell>
          <Cell dataKey="age" />
        </Column>

        <Column width={150}>
          <HeaderCell>Postcode</HeaderCell>
          <Cell dataKey="postcode" />
        </Column>

        <Column width={300}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>
        <Column width={80} fixed="right">
          <HeaderCell>...</HeaderCell>

          <Cell style={{ padding: "6px" }}>
            {(rowData) => (
              <Button
                appearance="link"
                onClick={() => alert(`id:${rowData.id}`)}
              >
                Edit
              </Button>
            )}
          </Cell>
        </Column>
      </Table>
      <div style={{ marginBottom: "30px" }} />
    </Container>
  );
};

export default BlankForTrainingMain;
