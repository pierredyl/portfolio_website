import InterpreterDemo from './InterpreterDemo'
import CheckpointDemo from './CheckpointDemo'
import BackboneDemo from './BackboneDemo'

// Registry of demo components, keyed by a project's `demo.type`. Adding a new
// project's demo means writing one component and adding one line here.
export const demos = {
  interpreter: InterpreterDemo,
  checkpoint: CheckpointDemo,
  backbone: BackboneDemo,
}
