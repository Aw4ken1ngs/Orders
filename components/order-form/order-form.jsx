import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Listbox, ListboxItem } from "@nextui-org/react";
import { AutoSuggest } from "../auto-suggest/auto-suggest";
import { fetchProduts as fetchProdutsService } from "@/services/products";
import React, { useState, useEffect } from "react";
import { createOrder } from "@/services/order";
import { useStore } from "@/store";
import { fetchOrders } from "@/services/fetch-order";
import { updateOrder } from "@/services/order-update";



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

const PRODUCTS_VALIDATION = {
  quantity: q => Number(q) > 0
};

const FORM_VALIDATION = {
  city: v => v.length > 1 && /[a-zA-Zа-яА-Я]/.test(v),
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


export const OrderForm = ({ onOrderStatusUpdate }) => {

  const { showOrderModal, selectedOrder, setOpenOrderModal, setSelectedOrder, setOrders } = useStore()
  const [form, setForm] = useState(ORDER_FORM_INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [errorsProducts, setErrorsProducts] = useState({});
  const [visible, setVisible] = React.useState(false);
  const [dateOfPayment, setDateOfPayment] = React.useState("");
  const [productionTime, setProductionTime] = React.useState("");
  const [productsList, setProductsList] = useState([]);
  const [productQuantity, setProductQuantity] = useState("")
  const [buttonClicked, setButtonClicked] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (selectedOrder) {
      setForm(selectedOrder);
      setList(selectedOrder.products);
    }
  }, [selectedOrder])

  useEffect(() => {
    fetchProdutsService().then((data) => {
      setProductsList(data)
    })
  }, [])


  const onOpen = () => {
    setOpenOrderModal(true);
  }

  const onOpenChange = () => {
    setOpenOrderModal(false);
    setSelectedOrder(null);
  }


  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const submitHandler = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      console.log('Form is Valid');
      const newOrder = { ...form, products: list };
      console.log('созданный массив', newOrder)
      closeHandler();
      // props.onOrderCreated(newOrder);
      // createOrder(newOrder);
      setOpenOrderModal(false);
      // fetchOrders().then((data) => {
      //   console.log(data, 'data123456')
      // });
      if (selectedOrder) {
        updateOrder(newOrder).then(async () => {
          const data = await fetchOrders();
          setOrders(data);
          onOrderStatusUpdate('update');
        });
      } else {
        createOrder(newOrder).then(async () => {
          const data = await fetchOrders();
          setOrders(data);
          onOrderStatusUpdate('create')
        });

      }
      // if (selectedOrder) {
      //   //обновить запись в базе
      //   //обновить список заказов 
      // }else {
      //   createOrder(newOrder).then(res=>res.json()).then(data => {
      //     if (data.ok){
      //       //закрыть форму 
      //     //обновить список заказов 
      //     }
      //   })
      // }
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
    setErrorsProducts({
      ...errorsProducts,
      [id]: '',
    })
    setList(newList)
  }

  const removeList = (id) => {
    const newList = list.filter((item) => item.id !== id);
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
    setErrors({
      ...errors,
      [event.target.name]: '',
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
    let newErrors = {};
    for (let key in form) {
      if (FORM_VALIDATION[key]) {
        if (!FORM_VALIDATION[key](form[key])) {
          newErrors[key] = FORM_ERRORS[key]
        }
      }
    }
    setErrors(newErrors);
    const isProductsValid = validateProducts();
    return Object.keys(newErrors).length === 0 && isProductsValid
  }

  const validateProducts = () => {
    let errorProducts = {};
    list.forEach((product) => {
      if (!PRODUCTS_VALIDATION.quantity(product.quantity)) {
        errorProducts[product.id] = 'заполните поле'
      }
    })
    console.log(errorProducts, 'product23')
    setErrorsProducts(errorProducts);
    return Object.keys(errorProducts).length === 0
  }

  return (
    <>
      <Button variant="light" onPress={onOpen} color="default">Создать заказ</Button>
      <Modal
        isOpen={showOrderModal}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Создание заказа</ModalHeader>
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
                    errorMessage={errors.organization ? FORM_ERRORS.organization : ''}
                    isInvalid={Boolean(errors.organization)}
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
                    <TableColumn />
                  </TableHeader>
                  <TableBody>
                    {list.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell
                        >{product.name}
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="Заполните поле"
                            errorMessage={errorsProducts[product.id] ? errorsProducts[product.id] : ''}
                            isInvalid={Boolean(errorsProducts[product.id])}
                            onChange={
                              (event) => {
                                updateList(product.id, event.target.value)
                                handleInputChange(event, setProductQuantity)
                              }
                            }
                            value={product.quantity !== 0 ? product.quantity : ""} />
                        </TableCell>
                        <TableCell>
                          <Input
                            label={product.price}
                          />
                        </TableCell>
                        <TableCell>
                          {product.sum}
                        </TableCell>
                        <TableCell>
                          <button onClick={() => { removeList(product.id) }}>X</button>
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
                    errorMessage={errors.dateOfPayment ? FORM_ERRORS.dateOfPayment : ''}
                    isInvalid={Boolean(errors.dateOfPayment)}
                    onChange={handleFormChange}
                  />
                  <Select
                    errorMessage={errors.formOfPayment ? FORM_ERRORS.formOfPayment : ''}
                    isInvalid={Boolean(errors.formOfPayment)}
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
                    errorMessage={errors.area ? FORM_ERRORS.area : ''}
                    isInvalid={Boolean(errors.area)}
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
                    errorMessage={errors.productionTime ? FORM_ERRORS.productionTime : ''}
                    isInvalid={Boolean(errors.productionTime)}
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
                    errorMessage={errors.status ? FORM_ERRORS.status : ''}
                    isInvalid={Boolean(errors.status)}
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
                  {selectedOrder ? 'Обновить' : 'Создать'}
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
