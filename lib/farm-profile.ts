export type FarmProfile = {
  name: string
  address: string
  totalAreaHa: number
  businessLicenseStatus: "Verified" | "Pending" | "Expired"
}

export const mockFarmProfile: FarmProfile = {
  name: "Hợp tác xã Dược Liệu BioHerb",
  address: "Thôn An Bình, Xã Phú Hữu, Huyện Phú Tài, Tỉnh X",
  totalAreaHa: 125.6,
  businessLicenseStatus: "Verified",
}
