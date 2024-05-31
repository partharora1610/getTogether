import { create } from "zustand"
import axios from "axios"

type Store = {
  clientName: string
  clientEmail: string
  clientPhone: string

  vendorBusinessName: string
  vendorContactPerson: string
  vendorAddress: string
  vendorPhoneNumber: string
  vendorEmail: string

  services: string

  eventDate: string
  eventVenue: string
  eventVenueAddress: string
  eventTime: string

  paymentTotal: string
  paymentSchedule: string
  paymentMethod: string

  cancellationPolicyClient: string
  cancellationPolicyVendor: string
  isValid: boolean

  updateField: (field: string, value: string) => void
  clearStore: () => void

  getDataObject: () => any
}

const contractStore = create<Store>((set) => ({
  clientName: "",
  clientEmail: "",
  clientPhone: "",

  vendorBusinessName: "",
  vendorContactPerson: "",
  vendorAddress: "",
  vendorPhoneNumber: "",
  vendorEmail: "",

  eventDate: "",
  eventVenue: "",
  eventVenueAddress: "",
  eventTime: "",

  services: "",

  paymentTotal: "",
  paymentSchedule: "",
  paymentMethod: "",

  cancellationPolicyClient: "",
  cancellationPolicyVendor: "",

  isValid: false,

  getDataObject() {
    const store = contractStore.getState()

    const data: any = {
      clientName: store.clientName,
      clientEmail: store.clientEmail,
      clientPhone: store.clientPhone,
      vendorBusinessName: store.vendorBusinessName,
      vendorContactPerson: store.vendorContactPerson,
      vendorAddress: store.vendorAddress,
      vendorPhoneNumber: store.vendorPhoneNumber,
      vendorEmail: store.vendorEmail,
      eventDate: store.eventDate,
      eventVenue: store.eventVenue,
      eventVenueAddress: store.eventVenueAddress,
      eventTime: store.eventTime,
      services: store.services,
      paymentTotal: store.paymentTotal,
      paymentSchedule: store.paymentSchedule,
      paymentMethod: store.paymentMethod,
      cancellationPolicyClient: store.cancellationPolicyClient,
      cancellationPolicyVendor: store.cancellationPolicyVendor,
    }

    return data
  },

  updateField: (field, value) => {
    set({ [field]: value })

    const {
      clientName,
      clientEmail,
      clientPhone,
      vendorBusinessName,
      vendorContactPerson,
      vendorAddress,
      vendorPhoneNumber,
      vendorEmail,
      eventDate,
      eventVenue,
      eventVenueAddress,
      eventTime,
      services,
      paymentTotal,
      paymentSchedule,
      paymentMethod,
      cancellationPolicyClient,
      cancellationPolicyVendor,
    } = contractStore.getState()

    const valid: boolean =
      clientName.length != 0 &&
      clientEmail.length != 0 &&
      clientPhone.length != 0 &&
      vendorBusinessName.length != 0 &&
      vendorContactPerson.length != 0 &&
      vendorAddress.length != 0 &&
      vendorPhoneNumber.length != 0 &&
      vendorEmail.length != 0 &&
      eventDate.length != 0 &&
      eventVenue.length != 0 &&
      eventVenueAddress.length != 0 &&
      eventTime.length != 0 &&
      services.length != 0 &&
      paymentTotal.length != 0 &&
      paymentSchedule.length != 0 &&
      paymentMethod.length != 0 &&
      cancellationPolicyClient.length != 0 &&
      cancellationPolicyVendor.length != 0

    set({ isValid: valid })
  },

  clearStore: () => {
    set({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      vendorBusinessName: "",
      vendorContactPerson: "",
      vendorAddress: "",
      vendorPhoneNumber: "",
      vendorEmail: "",
      eventDate: "",
      eventVenue: "",
      eventVenueAddress: "",
      eventTime: "",
      services: "",
      paymentTotal: "",
      paymentSchedule: "",
      paymentMethod: "",
      cancellationPolicyClient: "",
      cancellationPolicyVendor: "",
      isValid: false,
    })
  },
}))

export default contractStore
