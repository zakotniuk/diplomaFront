import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/v1/company';

export const Company = () => {
    return axios.get(REST_API_BASE_URL);
}

//запрос на сервер для создания сотрудника
//export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

export const getCompany = (companyId) => axios.get(REST_API_BASE_URL + '/' + companyId + '/info');

export const getCompanyClientAccountsList = (companyId) => axios.get(REST_API_BASE_URL + '/' + companyId + '/all-client-accounts');

export const getCompanyGroupsList = (companyId) => axios.get(REST_API_BASE_URL + '/' + companyId + '/all-groups');

export const createGroup = (companyId, group) => axios.post(REST_API_BASE_URL + '/' + companyId + '/new-group', group);

export const updateGroup = (companyId, groupId, group) => axios.patch(REST_API_BASE_URL + '/' + companyId + '/group/' + groupId, group);

export const getCompanyTransactionsList = (companyId) => axios.get(REST_API_BASE_URL + '/' + companyId + '/transactions');

//export const updateEmployee = (employeeId, employee) => axios.put(REST_API_BASE_URL + '/' +employeeId, employee);

export const deleteGroup = (companyId, groupId) => axios.delete(REST_API_BASE_URL + '/' + companyId + '/group/' + groupId);