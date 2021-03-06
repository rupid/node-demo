/*
 * @Desc:
 * @FilePath: /node-demo/test/cluster/cluster copy.js
 * @Author: liujianwei1
 * @Date: 2021-07-10 23:43:55
 * @LastEditors: liujianwei1
 * @Reference Desc:
 */
const cluster = require("cluster")
const os = require("os")

if (cluster.isMaster) {
  const cpus = os.cpus().length//cup内核数量

  console.log(`Forking for ${cpus} CPUs`)
  for (let i = 0; i < cpus; i++) {
    // 使用 cluster.fork 创建子进程
    cluster.fork()
  }

  const updateWorkers = () => {
    const usersCount = numberOfUsersInDB()
    Object.values(cluster.workers).forEach(worker => {
      worker.send({ usersCount })
    })
  }

  updateWorkers()
  setInterval(updateWorkers, 10000)
} else {
  require("./server")
}