import { IInvoice } from "./home";
import moment from 'moment';

export type InvoiceFormContextType = {
  invoiceForm: { open: boolean, mode: string, invoiceEditing: IInvoice | null };
  invoiceFormBillFrom: { street_adress: string, city: string, post_code: string, country: string };
  invoiceFormBillTo: {
    name: string, email: string, street_adress: string, city: string, post_code: string, country: string, invoice_date:  moment.Moment | Date | string | null, payment_terms: string, project_description: string
  };
  invoiceFormItemList: {
    name: string; price: string; quantity: string; id: number; emptyFields: string[];
  }[];
  invoiceFormFieldErrors: string[];
  triggerEditingMode: (invoice: IInvoice) => void;
  checkFormErrors: () => boolean;
  cleanInvoiceForm: () => void;
  addInvoiceFormItem: () => void;
  deleteInvoiceFormItem: (itemId: number) => void;
  onChangeInvoiceFormItemList: (itemId: number, inputName: string, inputValue: string) => void;
  onChangeInvoiceFormBillFrom: (inputName: string, inputValue: string) => void;
  onChangeInvoiceFormBillTo: (inputName: string, inputValue: string | null) => void;
  setInvoiceForm: React.Dispatch<React.SetStateAction<{
    open: boolean;
    mode: string;
    invoiceEditing: IInvoice | null;
}>>
};