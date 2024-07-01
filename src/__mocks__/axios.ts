import { AxiosStatic } from "axios";

const mockAxios = jest.genMockFromModule<jest.Mocked<AxiosStatic>>("axios");

mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;
