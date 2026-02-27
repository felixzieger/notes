
- Abstractions embed explanations about reality.
	- **Abstraction**: Removing or generalising details or attributes to focus attention on details that are important for solving a problem one cares about. When everything I care about is still there and nothing can be left out or changed without making the abstraction less useful, we speak of a good abstraction. The generalised case of this is made in [[Good Explanations are hard to vary]].
	- **Illusion**: Removing or generalizing important details, which cause the user to be misled
- To [quote Dijkstra](https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html):
	- > The purpose of abstracting is not to be vague, but to create a new semantic level in which one can be absolutely precise.
- Bad abstractions are harmful when designing a system because they make it impossible to find good explanations about the system.
- We are prone to create bad abstractions because [[Reality has a surprising amount of detail]] and figuring out which details to leave out is hard.
- Hacking means [ignoring abstractions and instead working things as they are](https://gwern.net/unseeing).
- Source: 11:15 {{video https://www.youtube.com/watch?v=vUE_1gkhmSU}}
-
- https://bravenewgeek.com/abstraction-considered-harmful/
	- About programmers that want to solve a hard problem and figure out there is a sub-problem that they need to solve :
		- > It’s kind of a cruel irony. The programmer complains that there’s not enough abstraction for a hard sub-problem. Indeed, the programmer doesn’t care about solving the sub-problem. They are focused on solving the greater problem at hand. So, as any good programmer would do, we build an abstraction for the hard sub-problem, mask its inner workings, and expose what we think is necessary for interacting with it. But then we discover that the abstraction *leaks* and complain that it isn’t perfect. It turns out, hard problems are *hard*. The programmer then simply does away with the abstraction and solves the sub-problem for their specific case, handling the complexity in a way that makes sense for their application.
		  >
		  Abstraction doesn’t magically make things less hard. It just attempts to hide that fact from you. Just because the *semantics* are simple doesn’t mean the *solution* is. In fact, it’s often the opposite, yet this seems to be a frequently implied assumption.
	- from the same piece:
		- > The key takeaway is that abstractions leak, and we have to deal with that. There is never a silver bullet for problems of sufficient complexity. Peter ends his talk on a polemic against the way we currently view abstraction:
		  >
		  Let’s not make concrete, static abstractions. Trust ourselves to let ourselves peer below the facade. There’s a lot of complexity down there, but we need to engage with that complexity. We need tools that help us engage with the complexity, not a fire blanket. Abstractions are going to leak, so make the abstractions fluid.