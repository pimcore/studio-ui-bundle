import { AbstractJob, JobStatus } from "../../abstact-job"
import { getUniqueId } from "../../factory-helper"

export interface DeleteJob extends AbstractJob {
  type: 'delete'
}

export interface DeleteFactoryArgs {
  action: AbstractJob['action']
  title: AbstractJob['title']
  topics: AbstractJob['topics']
  elementIds: Array<number>
}

export const createJob = (job: DeleteFactoryArgs): DeleteJob => {
  return {
    id: getUniqueId(),
    action: job.action,
    type: 'delete',
    title: job.title,
    status: JobStatus.QUEUED,
    topics: job.topics,
    config: {}
  }
}