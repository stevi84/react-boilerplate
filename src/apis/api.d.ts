import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
  namespace Parameters {
    export type IdPathParam = number;
  }
  export interface PathParameters {
    idPathParam?: Parameters.IdPathParam;
  }
  namespace Responses {
    export type ErrorResponse =
      /**
       * Error
       * Informations about an error that has occurred.
       */
      Schemas.Error;
    export type SuccessfulCurrentUserResponse = /* CurrentUser */ Schemas.CurrentUser;
    export interface SuccessfulDeletedResponse {}
    export type SuccessfulManyTodosResponse = /* Todo */ Schemas.Todo[];
    export type SuccessfulManyUsersResponse = /* User */ Schemas.User[];
    export type SuccessfulOneTodoResponse = /* Todo */ Schemas.Todo;
    export type SuccessfulOneUserResponse = /* User */ Schemas.User;
  }
  namespace Schemas {
    /**
     * CreateTodo
     */
    export interface CreateTodo {
      /**
       * Owner of the todo.
       * example:
       * Kerstin Barth
       */
      owner: string;
      /**
       * Due date of the todo.
       * example:
       * 2022-12-24T08:00:00
       */
      dueDate: string;
      /**
       * Description of the todo.
       * example:
       * Weihnachtsgeschenk besorgen
       */
      description: string;
      /**
       * Completed status of the todo.
       * example:
       * true
       */
      completed: boolean;
    }
    /**
     * CreateUser
     */
    export interface CreateUser {
      /**
       * Full name of the user.
       * example:
       * Kerstin Barth
       */
      name: string;
      /**
       * Date of birth of the user.
       * example:
       * 1945-09-04T00:00:00
       */
      dateOfBirth: string;
      /**
       * Body size in cm of the user.
       * example:
       * 165
       */
      size: number;
      /**
       * Body weight in kg of the user.
       * example:
       * 65.56
       */
      weight: number;
      /**
       * E-mail adress of the user.
       * example:
       * KerstinBarth@dayrep.com
       */
      email: string;
      /**
       * Phone number of the user.
       * example:
       * +496563941489
       */
      phone: string;
    }
    /**
     * CurrentUser
     */
    export interface CurrentUser {
      /**
       * The login name of the current user.
       * example:
       * MMUSTER
       */
      loginName: string;
      /**
       * The first name of the current user.
       * example:
       * Max
       */
      firstName: string;
      /**
       * The surname of the current user.
       * example:
       * Mustermann
       */
      surName: string;
      /**
       * The e-mail address of the current user.
       * example:
       * max.mustermann@test.de
       */
      mail: string;
      /**
       * The roles of the current user.
       */
      roles: /**
       * example:
       * EDITOR
       */
      Role[];
    }
    /**
     * Error
     * Informations about an error that has occurred.
     */
    export interface Error {
      /**
       * A URI reference that identifies the problem type.
       * example:
       * https://example.com/probs/out-of-credit
       */
      type: string;
      /**
       * A short, human-readable summary of the problem type.
       * example:
       * You do not have enough credit.
       */
      title: string;
      /**
       * The HTTP status code generated by the origin server for this occurrence of the problem.
       * example:
       * 400
       */
      status: number;
      /**
       * A human-readable explanation specific to this occurrence of the problem.
       * example:
       * Your current balance is 30, but that costs 50.
       */
      detail: string;
      /**
       * A URI reference that identifies the specific occurrence of the problem.
       * example:
       * /account/12345/msgs/abc
       */
      instance: string;
    }
    /**
     * example:
     * EDITOR
     */
    export type Role = 'READER' | 'EDITOR' | 'ADMIN';
    /**
     * Todo
     */
    export interface Todo {
      /**
       * Technical id of an entity.
       * example:
       * 1
       */
      id: number;
      /**
       * Create timestamp.
       * example:
       * 2022-12-01T15:02:28
       */
      tsCreate: string;
      /**
       * Update timestamp.
       * example:
       * 2022-12-01T15:02:28
       */
      tsUpdate: string;
      /**
       * Owner of the todo.
       * example:
       * Kerstin Barth
       */
      owner: string;
      /**
       * Due date of the todo.
       * example:
       * 2022-12-24T08:00:00
       */
      dueDate: string;
      /**
       * Description of the todo.
       * example:
       * Weihnachtsgeschenk besorgen
       */
      description: string;
      /**
       * Completed status of the todo.
       * example:
       * true
       */
      completed: boolean;
    }
    /**
     * UpdateTodo
     */
    export interface UpdateTodo {
      /**
       * Owner of the todo.
       * example:
       * Kerstin Barth
       */
      owner?: string;
      /**
       * Due date of the todo.
       * example:
       * 2022-12-24T08:00:00
       */
      dueDate?: string;
      /**
       * Description of the todo.
       * example:
       * Weihnachtsgeschenk besorgen
       */
      description?: string;
      /**
       * Completed status of the todo.
       * example:
       * true
       */
      completed?: boolean;
    }
    /**
     * UpdateUser
     */
    export interface UpdateUser {
      /**
       * Full name of the user.
       * example:
       * Kerstin Barth
       */
      name?: string;
      /**
       * Date of birth of the user.
       * example:
       * 1945-09-04T00:00:00
       */
      dateOfBirth?: string;
      /**
       * Body size in cm of the user.
       * example:
       * 165
       */
      size?: number;
      /**
       * Body weight in kg of the user.
       * example:
       * 65.56
       */
      weight?: number;
      /**
       * E-mail adress of the user.
       * example:
       * KerstinBarth@dayrep.com
       */
      email?: string;
      /**
       * Phone number of the user.
       * example:
       * +496563941489
       */
      phone?: string;
    }
    /**
     * User
     */
    export interface User {
      /**
       * Technical id of an entity.
       * example:
       * 1
       */
      id: number;
      /**
       * Create timestamp.
       * example:
       * 2022-12-01T15:02:28
       */
      tsCreate: string;
      /**
       * Update timestamp.
       * example:
       * 2022-12-01T15:02:28
       */
      tsUpdate: string;
      /**
       * Full name of the user.
       * example:
       * Kerstin Barth
       */
      name: string;
      /**
       * Date of birth of the user.
       * example:
       * 1945-09-04T00:00:00
       */
      dateOfBirth: string;
      /**
       * Body size in cm of the user.
       * example:
       * 165
       */
      size: number;
      /**
       * Body weight in kg of the user.
       * example:
       * 65.56
       */
      weight: number;
      /**
       * E-mail adress of the user.
       * example:
       * KerstinBarth@dayrep.com
       */
      email: string;
      /**
       * Phone number of the user.
       * example:
       * +496563941489
       */
      phone: string;
    }
  }
}
declare namespace Paths {
  namespace CreateTodo {
    export type RequestBody = /* CreateTodo */ Components.Schemas.CreateTodo;
    namespace Responses {
      export type $200 = Components.Responses.SuccessfulOneTodoResponse;
      export type $400 = Components.Responses.ErrorResponse;
      export type $500 = Components.Responses.ErrorResponse;
    }
  }
  namespace CreateUser {
    export type RequestBody = /* CreateUser */ Components.Schemas.CreateUser;
    namespace Responses {
      export type $200 = Components.Responses.SuccessfulOneUserResponse;
      export type $400 = Components.Responses.ErrorResponse;
      export type $500 = Components.Responses.ErrorResponse;
    }
  }
  namespace DeleteTodo {
    namespace Parameters {
      export type Id = number;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export type $204 = Components.Responses.SuccessfulDeletedResponse;
      export type $400 = Components.Responses.ErrorResponse;
      export type $404 = Components.Responses.ErrorResponse;
      export type $500 = Components.Responses.ErrorResponse;
    }
  }
  namespace DeleteUser {
    namespace Parameters {
      export type Id = number;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export type $204 = Components.Responses.SuccessfulDeletedResponse;
      export type $400 = Components.Responses.ErrorResponse;
      export type $404 = Components.Responses.ErrorResponse;
      export type $500 = Components.Responses.ErrorResponse;
    }
  }
  namespace ReadCurrentUser {
    namespace Responses {
      export type $200 = Components.Responses.SuccessfulCurrentUserResponse;
      export type $400 = Components.Responses.ErrorResponse;
      export type $500 = Components.Responses.ErrorResponse;
    }
  }
  namespace ReadTodo {
    namespace Parameters {
      export type Id = number;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export type $200 = Components.Responses.SuccessfulOneTodoResponse;
      export type $400 = Components.Responses.ErrorResponse;
      export type $404 = Components.Responses.ErrorResponse;
      export type $500 = Components.Responses.ErrorResponse;
    }
  }
  namespace ReadTodos {
    namespace Responses {
      export type $200 = Components.Responses.SuccessfulManyTodosResponse;
      export type $400 = Components.Responses.ErrorResponse;
      export type $500 = Components.Responses.ErrorResponse;
    }
  }
  namespace ReadUser {
    namespace Parameters {
      export type Id = number;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export type $200 = Components.Responses.SuccessfulOneUserResponse;
      export type $400 = Components.Responses.ErrorResponse;
      export type $404 = Components.Responses.ErrorResponse;
      export type $500 = Components.Responses.ErrorResponse;
    }
  }
  namespace ReadUsers {
    namespace Responses {
      export type $200 = Components.Responses.SuccessfulManyUsersResponse;
      export type $400 = Components.Responses.ErrorResponse;
      export type $500 = Components.Responses.ErrorResponse;
    }
  }
  namespace ReplaceTodo {
    namespace Parameters {
      export type Id = number;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    export type RequestBody = /* CreateTodo */ Components.Schemas.CreateTodo;
    namespace Responses {
      export type $200 = Components.Responses.SuccessfulOneTodoResponse;
      export type $400 = Components.Responses.ErrorResponse;
      export type $404 = Components.Responses.ErrorResponse;
      export type $500 = Components.Responses.ErrorResponse;
    }
  }
  namespace ReplaceUser {
    namespace Parameters {
      export type Id = number;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    export type RequestBody = /* CreateUser */ Components.Schemas.CreateUser;
    namespace Responses {
      export type $200 = Components.Responses.SuccessfulOneUserResponse;
      export type $400 = Components.Responses.ErrorResponse;
      export type $404 = Components.Responses.ErrorResponse;
      export type $500 = Components.Responses.ErrorResponse;
    }
  }
  namespace UpdateTodo {
    namespace Parameters {
      export type Id = number;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    export type RequestBody = /* UpdateTodo */ Components.Schemas.UpdateTodo;
    namespace Responses {
      export type $200 = Components.Responses.SuccessfulOneTodoResponse;
      export type $400 = Components.Responses.ErrorResponse;
      export type $404 = Components.Responses.ErrorResponse;
      export type $500 = Components.Responses.ErrorResponse;
    }
  }
  namespace UpdateUser {
    namespace Parameters {
      export type Id = number;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    export type RequestBody = /* UpdateUser */ Components.Schemas.UpdateUser;
    namespace Responses {
      export type $200 = Components.Responses.SuccessfulOneUserResponse;
      export type $400 = Components.Responses.ErrorResponse;
      export type $404 = Components.Responses.ErrorResponse;
      export type $500 = Components.Responses.ErrorResponse;
    }
  }
}

export interface OperationMethods {
  /**
   * readTodos - Read all todos.
   *
   * Read all todos.
   */
  'readTodos'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ReadTodos.Responses.$200>;
  /**
   * createTodo - Creates a new todo.
   *
   * Creates a new todos.
   */
  'createTodo'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateTodo.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateTodo.Responses.$200>;
  /**
   * readTodo - Read a todo.
   *
   * Read a todo.
   */
  'readTodo'(
    parameters?: Parameters<Paths.ReadTodo.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ReadTodo.Responses.$200>;
  /**
   * replaceTodo - Replace a todo.
   *
   * Replace a todo.
   */
  'replaceTodo'(
    parameters?: Parameters<Paths.ReplaceTodo.PathParameters> | null,
    data?: Paths.ReplaceTodo.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ReplaceTodo.Responses.$200>;
  /**
   * updateTodo - Update a todo.
   *
   * Update a todo.
   */
  'updateTodo'(
    parameters?: Parameters<Paths.UpdateTodo.PathParameters> | null,
    data?: Paths.UpdateTodo.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateTodo.Responses.$200>;
  /**
   * deleteTodo - Delete a todo.
   *
   * Delete a todo.
   */
  'deleteTodo'(
    parameters?: Parameters<Paths.DeleteTodo.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteTodo.Responses.$204>;
  /**
   * readUsers - Read all users.
   *
   * Read all users.
   */
  'readUsers'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ReadUsers.Responses.$200>;
  /**
   * createUser - Creates a new user.
   *
   * Creates a new user.
   */
  'createUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateUser.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateUser.Responses.$200>;
  /**
   * readUser - Read a user.
   *
   * Read a user.
   */
  'readUser'(
    parameters?: Parameters<Paths.ReadUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ReadUser.Responses.$200>;
  /**
   * replaceUser - Replace a user.
   *
   * Replace a user.
   */
  'replaceUser'(
    parameters?: Parameters<Paths.ReplaceUser.PathParameters> | null,
    data?: Paths.ReplaceUser.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ReplaceUser.Responses.$200>;
  /**
   * updateUser - Update a user.
   *
   * Update a user.
   */
  'updateUser'(
    parameters?: Parameters<Paths.UpdateUser.PathParameters> | null,
    data?: Paths.UpdateUser.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateUser.Responses.$200>;
  /**
   * deleteUser - Delete a user.
   *
   * Delete a user.
   */
  'deleteUser'(
    parameters?: Parameters<Paths.DeleteUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteUser.Responses.$204>;
  /**
   * readCurrentUser - Read details of the current user.
   *
   * Read details of the current user.
   */
  'readCurrentUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ReadCurrentUser.Responses.$200>;
}

export interface PathsDictionary {
  ['/todos']: {
    /**
     * readTodos - Read all todos.
     *
     * Read all todos.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ReadTodos.Responses.$200>;
    /**
     * createTodo - Creates a new todo.
     *
     * Creates a new todos.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateTodo.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateTodo.Responses.$200>;
  };
  ['/todos/{id}']: {
    /**
     * readTodo - Read a todo.
     *
     * Read a todo.
     */
    'get'(
      parameters?: Parameters<Paths.ReadTodo.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ReadTodo.Responses.$200>;
    /**
     * replaceTodo - Replace a todo.
     *
     * Replace a todo.
     */
    'put'(
      parameters?: Parameters<Paths.ReplaceTodo.PathParameters> | null,
      data?: Paths.ReplaceTodo.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ReplaceTodo.Responses.$200>;
    /**
     * updateTodo - Update a todo.
     *
     * Update a todo.
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateTodo.PathParameters> | null,
      data?: Paths.UpdateTodo.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateTodo.Responses.$200>;
    /**
     * deleteTodo - Delete a todo.
     *
     * Delete a todo.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteTodo.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteTodo.Responses.$204>;
  };
  ['/users']: {
    /**
     * readUsers - Read all users.
     *
     * Read all users.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ReadUsers.Responses.$200>;
    /**
     * createUser - Creates a new user.
     *
     * Creates a new user.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateUser.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateUser.Responses.$200>;
  };
  ['/users/{id}']: {
    /**
     * readUser - Read a user.
     *
     * Read a user.
     */
    'get'(
      parameters?: Parameters<Paths.ReadUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ReadUser.Responses.$200>;
    /**
     * replaceUser - Replace a user.
     *
     * Replace a user.
     */
    'put'(
      parameters?: Parameters<Paths.ReplaceUser.PathParameters> | null,
      data?: Paths.ReplaceUser.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ReplaceUser.Responses.$200>;
    /**
     * updateUser - Update a user.
     *
     * Update a user.
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateUser.PathParameters> | null,
      data?: Paths.UpdateUser.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateUser.Responses.$200>;
    /**
     * deleteUser - Delete a user.
     *
     * Delete a user.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteUser.Responses.$204>;
  };
  ['/currentUser']: {
    /**
     * readCurrentUser - Read details of the current user.
     *
     * Read details of the current user.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ReadCurrentUser.Responses.$200>;
  };
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>;
