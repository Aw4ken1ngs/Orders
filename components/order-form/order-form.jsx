import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Listbox, ListboxItem } from "@nextui-org/react";
import { AutoSuggest } from "../auto-suggest/auto-suggest";
import { fetchProduts as fetchProdutsService } from "@/services/products";
import React, { useState, useEffect } from "react";

const units = [
  {
    label: "Штуки", value: "шт."
  },
  {
    label: "Квадратный метр", value: "м2"
  }
];

const formOfPayments = [
  {
    label: "ЦК"
  },
  {
    label: "ИП"
  },
  {
    label: "Нал Алексей"
  },
  {
    label: "Нал Томара"
  }
];

const areas = [
  {
    label: "с. Неверкино", value: "Неверкино"
  },
  {
    label: "с. Камешкир", value: "Камешкир"
  },
  {
    label: "с. Подстепки", value: "Подстепки"
  }
];

const statusList = [{
  label: "в процессе", value: "в процессе"
},
{
  label: "готово", value: "готово"
},
{
  label: "просрочено", value: "просрочено"
}];

export const OrderForm = () => {


  const [visible, setVisible] = React.useState(false);
  const [city, setCity] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [nomenclature, setNomenclature] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [dateOfPayment, setDateOfPayment] = React.useState("");
  const [formOfPayment, setFormOfPayment] = React.useState("");
  const [area, setArea] = React.useState("");
  const [productionTime, setProductionTime] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [orders, setOrders] = React.useState([]);
  const [productsList, setProductsList] = useState([]);
  const [productQuantity, setProductQuantity] = useState("")

  useEffect(() => {
    fetchProdutsService().then((data) => {
      console.log(data, 'data23');
      setProductsList(data)
    })
  }, [])

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };


  const submitHandler = () => {
    const newOrder = { city, organization, quantity, unit, amount, dateOfPayment, formOfPayment, area, productionTime, status };
    console.log('созданный массив', newOrder)
    setOrders([...orders, newOrder]);
    closeHandler();
    props.onOrderCreated(newOrder);
  };

  const updateList = (id, quantity) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        item.quantity = quantity
        item.sum = item.quantity * item.price
        return item
      }
      return item
    }
    )
    setList(newList)
  }

  const [list, setList] = useState([]);
  console.log('list23', list)
  const addToList = (product) => {
    setList([...list, { ...product, quantity: 0, sum: 0 }])
  }

  const handleInputChange = (event, setState) => {
    const fieldValue = event.target.value;
    const isEmpty = fieldValue === "" || fieldValue === null || fieldValue === undefined;

    setState(fieldValue);

    if (isEmpty) {
      event.target.errorMessage = "заполните поле";
      event.target.isInvalid = true;
    } else {
      event.target.errorMessage = "";
      event.target.isInvalid = false;
    }
  };

  return (
    <ModalBody>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input
          type="text"
          errorMessage={city ? "" : "заполните поле"}
          isInvalid={!city}
          label="Город"
          value={city}
          onChange={(e) => handleInputChange(e, setCity)}
        />
        <Input
          type="text"
          errorMessage={organization ? "" : "заполните поле"}
          isInvalid={!organization}
          label="Организация"
          value={organization}
          onChange={(e) => handleInputChange(e, setOrganization)}
        />
      </div>
      <AutoSuggest onProductSelected={addToList} items={productsList} />
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Номенклатура</TableColumn>
          <TableColumn>Количество</TableColumn>
          <TableColumn>Цена</TableColumn>
          <TableColumn>Сумма</TableColumn>
        </TableHeader>
        <TableBody>
          {list.map((product) => (
            <TableRow key={product.id}>
              <TableCell
              >{product.name}
              </TableCell>
              <TableCell>
                <Input
                  errorMessage={productQuantity ? "" : "заполните поле"}
                  isInvalid={!productQuantity}
                  onChange={
                    (event) => {
                      updateList(product.id, event.target.value)
                      handleInputChange(event, setProductQuantity)
                    }
                  }
                  value={product.quantity} />
              </TableCell>
              <TableCell>
                <Input
                  value={product.price} />
              </TableCell>
              <TableCell>
                {product.sum}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full flex flex-row flex-wrap gap-4">
        <Input
          type="date"
          clearable
          bordered
          className="max-w-[18%]"
          size="lg"
          label="Дата оплаты"
          value={dateOfPayment}
          errorMessage={dateOfPayment ? "" : "заполните поле"}
          isInvalid={!dateOfPayment}
          onChange={(e) => handleInputChange(e, setDateOfPayment)}
        />
        <Select
          errorMessage={formOfPayment ? "" : "заполните поле"}
          isInvalid={!formOfPayment}
          label="Форма оплаты"
          className="max-w-[18%]"
          value={formOfPayment}
          onChange={(e) => handleInputChange(e, setFormOfPayment)}
        >
          {formOfPayments.map((formOfPayment) => (
            <SelectItem key={formOfPayment.value} value={formOfPayment.value}>
              {formOfPayment.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          errorMessage={area ? "" : "заполните поле"}
          isInvalid={!area}
          label="Площадка"
          className="max-w-[18%]"
          value={area}
          onChange={(e) => handleInputChange(e, setArea)}
        >
          {areas.map((area) => (
            <SelectItem key={area.value} value={area.value}>
              {area.label}
            </SelectItem>
          ))}
        </Select>
        <Input
          errorMessage={productionTime ? "" : "заполните поле"}
          isInvalid={!productionTime}
          type="date"
          clearable
          bordered
          className="max-w-[18%]"
          size="lg"
          label="Срок"
          value={productionTime}
          onChange={(e) => handleInputChange(e, setProductionTime)}
        />
        <Select
          errorMessage={status ? "" : "заполните поле"}
          isInvalid={!status}
          label="Статус"
          className="max-w-[18%]"
          value={status}
          onChange={(e) => handleInputChange(e, setStatus)}
        >
          {statusList.map((statusItem) => (
            <SelectItem key={statusItem.value} value={statusItem.value}>
              {statusItem.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Button color="success" onPress={submitHandler}>
        Создать
      </Button>
    </ModalBody>
  )
}