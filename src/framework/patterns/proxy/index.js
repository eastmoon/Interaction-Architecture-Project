/*
Proxy pattern, ref : https://en.wikipedia.org/wiki/Proxy_pattern

Proxy is a middle class, which is like a algorithm agent, hidden algorithm, storage variable.
In MVC framework, Proxy will call by View or Controller, and Proxy will using kernel tools to connection with remote server, local storage, file I/O etc.
When Proxy state is change, it will notify to any traget who want to know.

Proxy will have an ability like :
  1. Observer
  2. Immutable (not necessary)
  3. Dynamic get/set attribute, and reflection method.

author: jacky.chen
*/
