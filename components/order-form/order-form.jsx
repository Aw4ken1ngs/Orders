import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Listbox, ListboxItem } from "@nextui-org/react";
import { AutoSuggest } from "../auto-suggest/auto-suggest";
import { fetchProduts as fetchProdutsService } from "@/services/products";
import React, { useState, useEffect } from "react";
import { createOrder } from "@/services/order";

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

const ORDER_FORM_INITIAL_STATE = {
  city: '',
  organization: '',
  dateOfPayment: '',
  formOfPayment: '',
  status: '',
  area: '',
  amount: '',
  productionTime: '',
};


const FORM_VALIDATION = {
  city: v => v.length > 1 && /\w/.test(v),
  organization: Boolean,
  dateOfPayment: Boolean,
  formOfPayment: Boolean,
  status: Boolean,
  area: Boolean,
  productionTime: Boolean,
};

const FORM_ERRORS = {
  city: 'Заполните поле город',
  organization: 'Заполните поле организация',
  dateOfPayment: 'Введите дату платежа',
  formOfPayment: 'Введите форму оплаты',
  status: 'Заполните поле статус',
  area: 'Заполните поле площадка',
  productionTime: 'Заполните время производства',
};


export const OrderForm = (props) => {

  const [form, setForm] = useState(ORDER_FORM_INITIAL_STATE);
  const [errors, setErrors] = useState({});

  const [visible, setVisible] = React.useState(false);
  const [dateOfPayment, setDateOfPayment] = React.useState("");
  const [productionTime, setProductionTime] = React.useState("");
  const [orders, setOrders] = React.useState([]);
  const [productsList, setProductsList] = useState([]);
  const [productQuantity, setProductQuantity] = useState("")
  const [buttonClicked, setButtonClicked] = useState(false);
  const [list, setList] = useState([]);

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
    const isFormValid = validateForm();

    if (isFormValid) {
      console.log('Form is Valid');
/*      const newOrder = form;
      console.log('созданный массив', newOrder)
      setOrders([...orders, newOrder]);
      closeHandler();
      // props.onOrderCreated(newOrder);
      createOrder(newOrder);
      setButtonClicked(true);*/
    } else {
      console.log('Form NOT Valid');

    }
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



  console.log('list23', list)
  const addToList = (product) => {
    setList([...list, { ...product, quantity: 0, sum: 0 }])
  }

  const handleFormChange = (event) => {
    //event.target.value // asdasd
    //event.target.name // <= organization
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
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

  console.log('errors23', errors);

  const validateForm = () => {
    for (let key in form) {
      if (FORM_VALIDATION[key]) {
        if (!FORM_VALIDATION[key](form[key])) {
          setErrors({
            ...errors,
            [key]: FORM_ERRORS[key]
          })
          return false;
        }
      }
    }
    return true
  }

  const a = {
    b: 'asd'
  }
  console.log(a.asdasd);

  return (
    <ModalBody>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input
          type="text"
          errorMessage={errors.city ? FORM_ERRORS.city : ''}
          isInvalid={Boolean(errors.city)}
          label="Город"
          name="city"
          value={form.city}
          onChange={handleFormChange}
        />
        <Input
          type="text"
          errorMessage={form.organization ? "" : "заполните поле"}
          isInvalid={buttonClicked && !form.organization}
          label="Организация"
          name="organization"
          value={form.organization}
          onChange={handleFormChange}
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
                  isInvalid={buttonClicked && !productQuantity}
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
          name="dateOfPayment"
          value={form.dateOfPayment}
          errorMessage={dateOfPayment ? "" : "заполните поле"}
          isInvalid={ buttonClicked && !dateOfPayment}
          onChange={handleFormChange}
        />
        <Select
          errorMessage={form.formOfPayment ? "" : "заполните поле"}
          isInvalid={ buttonClicked && !form.formOfPayment}
          label="Форма оплаты"
          className="max-w-[18%]"
          value={form.formOfPayment}
          name="formOfPayment"
          onChange={handleFormChange}
        >
          {formOfPayments.map((formOfPayment) => (
            <SelectItem key={formOfPayment.value} value={formOfPayment.value}>
              {formOfPayment.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          errorMessage={form.area ? "" : "заполните поле"}
          isInvalid={buttonClicked && !form.area}
          label="Площадка"
          className="max-w-[18%]"
          value={form.area}
          name="area"
          onChange={handleFormChange}
        >
          {areas.map((area) => (
            <SelectItem key={area.value} value={area.value}>
              {area.label}
            </SelectItem>
          ))}
        </Select>
        <Input
          errorMessage={productionTime ? "" : "заполните поле"}
          isInvalid={buttonClicked && !productionTime}
          type="date"
          clearable
          bordered
          className="max-w-[18%]"
          size="lg"
          label="Срок"
          value={form.productionTime}
          name="productionTime"
          onChange={handleFormChange}
        />
        <Select
          errorMessage={form.status ? "" : "заполните поле"}
          isInvalid={ buttonClicked && !form.status}
          label="Статус"
          className="max-w-[18%]"
          value={form.status}
          name="status"
          onChange={handleFormChange}
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