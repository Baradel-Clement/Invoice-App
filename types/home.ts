import moment from "moment";

export interface IInvoice {
  id: string;
  displayId: string;
  personalStreetAdress: string;
  personalCity: string;
  personalPostCode: string;
  personalCountry: string;
  clientName: string;
  clientEmail: string;
  clientStreetAdress: string;
  clientCity: string;
  clientPostCode: string;
  clientCountry: string;
  invoiceDate: string | Date | moment.Moment;
  paymentTerms: number;
  description: string;
  items: {
    name: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  total: number;
  status: string;
  createdAt: Date;
  userId: string;
}

export type HomeContextType = {
  statusFilter: boolean;
  statusFilterValue: string[];
  invoices: IInvoice[];
  viewInvoiceMode: { mode: boolean, invoiceId: string };
  confirmDeletion: { open: boolean, invoiceId: string, displayId: string };
  confirmEmail: { open: boolean, invoice: {} };
  deleteInvoiceState: (deletedId: string) => void;
  onChangeStatusFilterValue: (filterName: string) => void;
  setStatusFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setInvoices: React.Dispatch<React.SetStateAction<IInvoice[]>>;
  setViewInvoiceMode: React.Dispatch<React.SetStateAction<{
    mode: boolean;
    invoiceId: string;
  }>>
  setConfirmDeletion: React.Dispatch<React.SetStateAction<{
    open: boolean;
    invoiceId: string;
    displayId: string;
  }>>
  setConfirmEmail: React.Dispatch<React.SetStateAction<{
    open: boolean;
    invoice: {};
  }>>
};