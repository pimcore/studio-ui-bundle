import { AbstractJob, JobStatus } from "../../abstact-job"
import { getUniqueId } from "../../factory-helper"

export interface RestoreJob extends AbstractJob {
  type: 'restore'
}

export interface RestoreFactoryArgs {
  action: AbstractJob['action']
  title: AbstractJob['title']
  topics: AbstractJob['topics']
  elementIds: Array<number>
}

export const createJob = (job: RestoreFactoryArgs): RestoreJob => {
  return {
    id: getUniqueId(),
    action: job.action,
    type: 'restore',
    title: job.title,
    status: JobStatus.QUEUED,
    topics: job.topics,
    config: {}
  }
}