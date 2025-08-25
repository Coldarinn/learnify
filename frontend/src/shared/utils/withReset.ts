import { Action, AtomLike, AtomState, Ext, action } from "@reatom/core"

type ResetExt<State> = {
  reset: Action<[], State>
}

export const withReset =
  <Target extends AtomLike>(initialValue: AtomState<Target>): Ext<Target, ResetExt<AtomState<Target>>> =>
  (target) => ({
    // @ts-ignore
    reset: action(() => target.set(initialValue), `${target.name}.reset`),
  })
